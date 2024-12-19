import React from "react";
import { Navigate, Route } from "react-router-dom";

import { useAuth } from "../context/AuthContext"; // Import useAuth from AuthContext

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuth(); // Get isAuthenticated from AuthContext

  return (
    <Route
      {...rest}
      element={isAuthenticated() ? <Component /> : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;
