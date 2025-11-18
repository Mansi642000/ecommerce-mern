// src/config.js

// Backend deployed URL (must include /api)
const PROD = "https://ecommerce-mern-59vj.onrender.com/api";

// Local development URL
const DEV = "http://localhost:5000/api";

// Auto-select environment
export const API_URL = import.meta.env.PROD ? PROD : DEV;

// Endpoints
export const LOGIN_URL = `${API_URL}/auth/login`;
export const SIGNUP_URL = `${API_URL}/auth/signup`;
