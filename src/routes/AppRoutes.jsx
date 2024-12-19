import React, { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import InviteUser from "../components/pages/InviteUser"; // Import InviteUser component
import PublicRoute from "./PublicRoute"; // Import PublicRoute
import PrivateRoute from "./PrivateRoute"; // Import PrivateRoute

// Lazy loading of components
const Home = lazy(() => import("../components/pages/Home"));
const Login = lazy(() => import("../components/pages/Login"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Redirect from root to login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Private Route: Home */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        {/* Private Route: Invite User */}
        <Route
          path="/invite"
          element={
            <PrivateRoute>
              <InviteUser />
            </PrivateRoute>
          }
        />

        {/* Public Route: Login */}
        <Route
          path="/home"
          element={
            <PublicRoute restricted={false}>
              <Home />
            </PublicRoute>
          }
        />

        {/* Public Route: Invite User */}
        <Route
          path="/invite"
          element={
            <PublicRoute restricted={false}>
              <InviteUser />
            </PublicRoute>
          }
        />

        {/* Public Route: Login */}
        <Route
          path="/login"
          element={
            <PublicRoute restricted={false}>
              <Login />
            </PublicRoute>
          }
        />

        {/* 404: Page Not Found */}
        <Route
          path="*"
          element={
            <div style={{ textAlign: "center", padding: "2rem" }}>
              <h1>404 - Page Not Found</h1>
              <p>The page you are looking for does not exist.</p>
            </div>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
