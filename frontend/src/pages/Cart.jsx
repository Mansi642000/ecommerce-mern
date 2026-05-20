import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);
  }, []);

  const total = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  const updateCart = (nextItems) => {
    setCartItems(nextItems);
    localStorage.setItem("cart", JSON.stringify(nextItems));
  };

  const handleDelete = (index) => {
    updateCart(cartItems.filter((_, i) => i !== index));
  };

  const handleQuantityChange = (index, newQty) => {
    if (newQty < 1) return;
    const updated = [...cartItems];
    updated[index].quantity = newQty;
    updateCart(updated);
  };

  return (
      <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={item.image || "https://via.placeholder.com/50"} alt={item.name} className="w-14 h-14 rounded object-cover" />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
                  <div className="mt-1">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(idx, Number(e.target.value))}
                      className="border rounded px-2 py-1 w-20"
                    />
                  </div>
                </div>
              </div>
                <div className="text-right">
                <p className="font-semibold mb-2">${(item.price * item.quantity).toFixed(2)}</p>
                <button className="text-red-600 hover:underline" onClick={() => handleDelete(idx)}>Remove</button>
              </div>
            </div>
          ))}

          <div className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
            <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
            <button className="bg-purple-600 text-white px-5 py-2 rounded hover:bg-purple-700" onClick={() => navigate("/checkout")}>Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}