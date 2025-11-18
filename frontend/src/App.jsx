// src/App.jsx
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import React from "react";
// Pages
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";

// Components
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import StripeProviderWrapper from "./stripe/StripeProviderWrapper.jsx";

// Routing
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow px-4 py-6">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Protected routes */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <StripeProviderWrapper>
                  <Checkout />
                </StripeProviderWrapper>
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
