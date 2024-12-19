import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";  // Import toastify styles globally
import { AuthProvider } from "./context/AuthContext";  // Import Auth context provider
import "./App.css";  // Global styles
import "./index.css";  // Global index styles
import AppRoutes from "./routes/AppRoutes";  // Import app routes component

const App = () => (
  <AuthProvider>  {/* Provide authentication context to entire app */}
    <Router>  {/* Router setup for handling routing */}
      <Routes>  {/* Define routes using the Router */}
        <Route path="/*" element={<AppRoutes />} />  {/* Load AppRoutes */}
      </Routes>
    </Router>
    <ToastContainer />  {/* Toast container for displaying notifications */}
  </AuthProvider>
);

export default App;
