import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toastify styles globally
import "./App.css"; // Global styles
import { AuthProvider } from "./context/AuthContext"; // Import Auth context provider
import "./index.css"; // Global index styles
import AppRoutes from "./routes/AppRoutes"; // Import app routes component

function App() {
  const triggerError = () => {
    throw new Error("Test error for Rollbar integration");
  };

  return (
    <AuthProvider>
      {/* Provide authentication context to entire app */}
      <Router>
        {/* Router setup for handling routing */}
        <Routes>
          {/* Define routes using the Router */}
          <Route path="/*" element={<AppRoutes />} /> {/* Load AppRoutes */}
        </Routes>
      </Router>
      <ToastContainer /> {/* Toast container for displaying notifications */}
      <button onClick={triggerError}>Trigger Error</button>{" "}
      {/* Button to trigger error */}
    </AuthProvider>
  );
}

export default App;
