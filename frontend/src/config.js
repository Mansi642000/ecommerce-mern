// src/config.js
// src/config.js

// 🔥 Your Render backend URL
const PROD = "https://ecommerce-mern-59vj.onrender.com";
// 🔥 Local development URL
const DEV = "http://localhost:5000/api";

// 🔥 Auto switch based on environment
export const API_URL = import.meta.env.PROD ? PROD : DEV;

// Endpoints
export const LOGIN_URL = `${API_URL}/auth/login`;
export const SIGNUP_URL = `${API_URL}/auth/signup`;
