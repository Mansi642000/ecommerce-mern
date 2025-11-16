// src/pages/About.jsx
import React from "react";
import aboutImg from "../images/about.jpg";
export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 space-y-16 mt-10">

      {/* Hero / Intro Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg p-10 flex flex-col md:flex-row items-center gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About MyStore</h1>
          <p className="text-lg md:text-xl mb-6">
            We are a modern e-commerce platform committed to delivering the best products and a delightful shopping experience.
          </p>
        </div>
        <img
          src={aboutImg}
          alt="About Us"
          className="w-full md:w-1/2 rounded-lg shadow-lg"
        />
      </section>

      {/* Our Mission */}
      <section className="bg-gray-50 rounded-lg p-10 flex flex-col md:flex-row items-center gap-6">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80"
          alt="Mission"
          className="w-full md:w-1/2 rounded-lg shadow-lg"
        />
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            To provide top-quality products at competitive prices while ensuring an easy and enjoyable online shopping experience.
          </p>
          <p className="text-gray-700">
            We aim to make every customer’s experience seamless, from browsing to checkout and delivery.
          </p>
        </div>
      </section>

      {/* Our Team */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Team Member"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="font-semibold">John Doe</h3>
            <p className="text-gray-600 text-sm">Founder & CEO</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Team Member"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="font-semibold">Sarah Smith</h3>
            <p className="text-gray-600 text-sm">Head of Operations</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <img
              src="https://randomuser.me/api/portraits/men/46.jpg"
              alt="Team Member"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="font-semibold">Michael Lee</h3>
            <p className="text-gray-600 text-sm">Head of Marketing</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-purple-600 text-white rounded-lg p-10 text-center">
        <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
        <p className="mb-6">
          Fast delivery, top-quality products, responsive customer support, and a seamless online shopping experience.
        </p>
        <a
          href="/products"
          className="bg-white text-purple-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
        >
          Shop Now
        </a>
      </section>
    </div>
  );
}
