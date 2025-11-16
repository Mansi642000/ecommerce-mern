// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/productcard.jsx";
import { API_URL } from "../config.js";
import heroImg from "../images/home.jpg";
import aboutImg from "../images/about.jpg";

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/products?featured=true`)
      .then((res) => setFeaturedProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const testimonials = [
    {
      name: "Sarah Johnson",
      text: "Amazing products and super fast delivery! Highly recommend this store.",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Michael Lee",
      text: "Quality is top-notch, and the website is super easy to navigate.",
      image: "https://randomuser.me/api/portraits/men/46.jpg",
    },
    {
      name: "Emily Davis",
      text: "Excellent customer support. Will shop here again!",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 space-y-16">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg p-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Discover Amazing Products
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Shop the latest trends and get your favorites delivered fast.
          </p>
          <a
            href="/products"
            className="bg-white text-purple-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Shop Now
          </a>
        </div>
        <img
          src={heroImg}
          alt="Hero"
          className="w-full md:w-1/2 rounded-lg shadow-lg"
        />
      </section>

      {/* Featured Products Carousel */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Featured Products</h2>
        {featuredProducts.length > 0 ? (
          <div className="flex overflow-x-auto gap-4 py-2">
            {featuredProducts.map((product) => (
              <div key={product._id} className="flex-none w-64">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No featured products available.</p>
        )}
      </section>

      {/* About Us */}
      <section className="bg-gray-50 rounded-lg p-10 flex flex-col md:flex-row items-center gap-6">
        <img
          src={aboutImg}
          alt="About Us"
          className="w-full md:w-1/2 rounded-lg shadow-lg"
        />
        <div>
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <p className="text-gray-700 mb-4">
            We are a modern e-commerce store dedicated to bringing you the best products at the best prices. Our mission is to make online shopping fast, easy, and enjoyable.
          </p>
          <p className="text-gray-700">
            Customer satisfaction is our top priority. From premium quality products to excellent delivery service, we make shopping a delightful experience.
          </p>
        </div>
      </section>

      {/* Testimonials Slider */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-center">What Our Customers Say</h2>
        <div className="flex overflow-x-auto gap-6 py-2">
          {testimonials.map((t, idx) => (
            <div key={idx} className="flex-none w-80 bg-white rounded-lg shadow p-6 text-center">
              <img
                src={t.image}
                alt={t.name}
                className="w-16 h-16 rounded-full mx-auto mb-4"
              />
              <p className="text-gray-700 italic mb-2">"{t.text}"</p>
              <h3 className="font-semibold">{t.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-purple-600 text-white rounded-lg p-10 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Subscribe to Our Newsletter
        </h2>
        <p className="mb-6">
          Get exclusive offers, latest products, and updates straight to your inbox.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-3 rounded w-full sm:w-auto flex-grow text-gray-900"
          />
          <button className="bg-white text-purple-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition">
            Subscribe
          </button>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="bg-indigo-600 text-white rounded-lg p-10 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Free Shipping on Orders Over $50
        </h2>
        <p className="mb-6">
          Get your favorite products delivered straight to your door at no extra cost.
        </p>
        <a
          href="/products"
          className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
        >
          Explore Products
        </a>
      </section>
    </div>
  );
}
