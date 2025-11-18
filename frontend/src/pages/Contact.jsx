// src/pages/Contact.jsx
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../config.js";
import React from "react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ loading: false, success: "", error: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: "", error: "" });

    try {
      const res = await axios.post(`${API_URL}/contact`, formData);
      setStatus({ loading: false, success: res.data.message, error: "" });
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus({
        loading: false,
        success: "",
        error: err.response?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>
      
      {status.success && <p className="text-green-600 mb-4">{status.success}</p>}
      {status.error && <p className="text-red-600 mb-4">{status.error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={status.loading}
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition disabled:opacity-50"
        >
          {status.loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
