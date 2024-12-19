import React from "react";
import { Navigate } from "react-router-dom";

// Replace this function with your actual authentication logic
const isAuthenticated = () => {
  const authToken = localStorage.getItem("authToken");
  if (authToken) {
    // Example: Verify the token
    // return verifyToken(authToken);
    return true; // Simplified for demo
  }
  return false;
};

const PublicRoute = ({ children, restricted, redirectPath = "/dashboard" }) => {
  return isAuthenticated() && restricted ? (
    <Navigate to={redirectPath} />
  ) : (
    children
  );
};

export default PublicRoute;
