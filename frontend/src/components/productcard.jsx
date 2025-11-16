import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Check if product already in cart
    const existingItem = cart.find((item) => item._id === product._id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden flex flex-col">
      {/* Product Image */}
      <Link to={`/product/${product._id}`} className="overflow-hidden">
        <img
          src={product.image || "https://via.placeholder.com/200"}
          alt={product.name}
          className="w-full h-56 object-cover transform hover:scale-105 transition duration-300"
        />
      </Link>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-700 mb-4">${product.price.toFixed(2)}</p>

        {/* Buttons */}
        <div className="mt-auto flex gap-2">
          <Link
            to={`/product/${product._id}`}
            className="flex-1 text-center bg-gray-200 text-gray-800 font-semibold px-3 py-2 rounded hover:bg-gray-300 transition"
          >
            View
          </Link>
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-purple-600 text-white font-semibold px-3 py-2 rounded hover:bg-purple-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
