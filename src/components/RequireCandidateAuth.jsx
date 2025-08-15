// src/components/RequireCandidateAuth.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const RequireCandidateAuth = ({ children }) => {
  const token = localStorage.getItem("candidateToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RequireCandidateAuth;
