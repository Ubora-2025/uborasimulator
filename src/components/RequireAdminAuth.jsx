// components/RequireAdminAuth.jsx
import React from "react";
import { Navigate } from "react-router-dom";

export default function RequireAdminAuth({ children }) {
  const token = localStorage.getItem("adminToken"); // ✅ doit être adminToken

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}