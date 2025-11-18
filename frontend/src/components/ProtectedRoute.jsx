// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import React from "react";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token"); // check if user is logged in
  if (!token) {
    return <Navigate to="/login" replace />; // redirect to login if not logged in
  }
  return children;
}

export default ProtectedRoute;
