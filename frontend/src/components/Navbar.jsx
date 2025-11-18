// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ name: "User" });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate("/")}>
            <h1 className="text-2xl font-bold">MyStore</h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="hover:text-gray-300">Home</Link>
            <Link to="/products" className="hover:text-gray-300">Products</Link>
            <Link to="/about" className="hover:text-gray-300">About</Link>
            <Link to="/contact" className="hover:text-gray-300">Contact</Link>
            <Link to="/cart" className="hover:text-gray-300">Cart</Link>

            {user ? (
              <>
                <span className="ml-2">Hello, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="ml-2 bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="hover:text-gray-300">Login</Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-700 px-4 py-4 space-y-2">
          <Link to="/" className="block hover:text-gray-300" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/products" className="block hover:text-gray-300" onClick={() => setMenuOpen(false)}>Products</Link>
          <Link to="/about" className="block hover:text-gray-300" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/contact" className="block hover:text-gray-300" onClick={() => setMenuOpen(false)}>Contact</Link>
          <Link to="/cart" className="block hover:text-gray-300" onClick={() => setMenuOpen(false)}>Cart</Link>

          {user ? (
            <>
              <span className="block mt-2">Hello, {user.name}</span>
              <button
                onClick={() => { handleLogout(); setMenuOpen(false); }}
                className="w-full mt-2 bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="block hover:text-gray-300" onClick={() => setMenuOpen(false)}>Login</Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
