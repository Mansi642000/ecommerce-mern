// src/pages/Checkout.jsx
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_YourStripePublicKeyHere"); // replace with your Stripe key

function CheckoutForm({ cartItems }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [email, setEmail] = useState("");
  const [shipping, setShipping] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: ""
  });

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    if (!email || !shipping.name || !shipping.address) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await fetch("http://localhost:5000/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Math.round(total * 100),
          cartItems,
          customerEmail: email,
          shipping
        })
      });
      const { clientSecret } = await res.json();

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: { email, name: shipping.name }
        },
        shipping: {
          name: shipping.name,
          address: {
            line1: shipping.address,
            city: shipping.city,
            state: shipping.state,
            postal_code: shipping.zip,
            country: shipping.country
          }
        }
      });

      if (error) {
        setErrorMsg(error.message);
      } else if (paymentIntent.status === "succeeded") {
        setSuccessMsg("Payment successful! Redirecting to home...");
        localStorage.removeItem("cart");
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleShippingChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 flex flex-col md:flex-row gap-8">
      {/* Cart Summary */}
      <div className="md:w-1/2 bg-gray-50 p-6 rounded-lg shadow space-y-4">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
        {cartItems.length === 0 && <p>Your cart is empty.</p>}
        {cartItems.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={item.image || "https://via.placeholder.com/50"} alt={item.name} className="w-12 h-12 object-cover rounded" />
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
              </div>
            </div>
            <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
        <hr className="my-2" />
        <p className="text-lg font-bold text-right">Total: ${total.toFixed(2)}</p>
      </div>

      {/* Payment & Shipping Form */}
      <div className="md:w-1/2 bg-white p-6 rounded-lg shadow space-y-6">
        <h2 className="text-2xl font-bold mb-4">Payment & Shipping</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />

          {/* Shipping */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={shipping.name}
            onChange={handleShippingChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={shipping.address}
            onChange={handleShippingChange}
            className="w-full p-2 border rounded"
            required
          />
          <div className="flex gap-2">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={shipping.city}
              onChange={handleShippingChange}
              className="w-1/2 p-2 border rounded"
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={shipping.state}
              onChange={handleShippingChange}
              className="w-1/2 p-2 border rounded"
            />
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              name="zip"
              placeholder="ZIP"
              value={shipping.zip}
              onChange={handleShippingChange}
              className="w-1/2 p-2 border rounded"
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={shipping.country}
              onChange={handleShippingChange}
              className="w-1/2 p-2 border rounded"
            />
          </div>

          {/* Card Input */}
          <div className="border p-3 rounded">
            <CardElement options={{ hidePostalCode: true }} />
          </div>

          {errorMsg && <p className="text-red-600">{errorMsg}</p>}
          {successMsg && <p className="text-green-600">{successMsg}</p>}

          <button
            type="submit"
            disabled={!stripe || loading}
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition disabled:opacity-50"
          >
            {loading ? "Processing..." : `Pay $${total.toFixed(2)}`}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function Checkout() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);
  }, []);

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm cartItems={cartItems} />
    </Elements>
  );
}
