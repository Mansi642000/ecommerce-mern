import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_YourStripePublicKeyHere"); // Replace with your Stripe public key

function CheckoutForm({ cartItems, setCartItems }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Shipping info
  const [shipping, setShipping] = useState({
    name: "",
    email: "",
    address: "",
  });

  // Calculate total
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleInputChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  // ---------------- CART HANDLERS ----------------

  // Delete item
  const handleDelete = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Change quantity
  const handleQuantityChange = (index, newQty) => {
    if (newQty < 1) return; // minimum 1
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = newQty;
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // ---------------- PAYMENT HANDLER ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    if (!shipping.name || !shipping.email || !shipping.address) {
      setErrorMsg("Please fill in all shipping details.");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await fetch("http://localhost:5000/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: Math.round(total * 100), cartItems, customerEmail: shipping.email })
      });
      const { clientSecret } = await res.json();

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) }
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

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 flex flex-col md:flex-row gap-8">
      
      {/* Order Summary */}
      <div className="md:w-1/2 bg-gray-50 p-4 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          cartItems.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={item.image || "https://via.placeholder.com/50"}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <div className="flex items-center gap-2">
                    <span>Qty:</span>
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) => handleQuantityChange(idx, parseInt(e.target.value))}
                      className="w-12 p-1 border rounded text-center"
                    />
                  </div>
                  <button
                    onClick={() => handleDelete(idx)}
                    className="text-red-500 text-sm mt-1 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))
        )}
        <hr className="my-2" />
        <p className="text-lg font-bold text-right">Total: ${total.toFixed(2)}</p>
      </div>

      {/* Payment & Shipping Form */}
      <div className="md:w-1/2 bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-bold mb-4">Shipping & Payment</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Shipping Info */}
          <div className="space-y-2">
            <input
              type="text"
              name="name"
              value={shipping.name}
              onChange={handleInputChange}
              placeholder="Full Name"
              className="w-full p-3 border rounded"
            />
            <input
              type="email"
              name="email"
              value={shipping.email}
              onChange={handleInputChange}
              placeholder="Email Address"
              className="w-full p-3 border rounded"
            />
            <input
              type="text"
              name="address"
              value={shipping.address}
              onChange={handleInputChange}
              placeholder="Shipping Address"
              className="w-full p-3 border rounded"
            />
          </div>

          {/* Card Input */}
          <div className="border p-3 rounded">
            <CardElement options={{ hidePostalCode: true }} />
          </div>

          {/* Messages */}
          {errorMsg && <p className="text-red-600">{errorMsg}</p>}
          {successMsg && <p className="text-green-600">{successMsg}</p>}

          <button
            type="submit"
            disabled={!stripe || loading || cartItems.length === 0}
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
      <CheckoutForm cartItems={cartItems} setCartItems={setCartItems} />
    </Elements>
  );
}
