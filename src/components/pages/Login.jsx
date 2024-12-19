import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useAuth } from "../context/AuthContext"; // Correct import for AuthContext
import { login } from "../services/authService"; // Import login from authService

const Login = () => {
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [error, setError] = useState(null); // State for error messages
  const [loading, setLoading] = useState(false); // State for loading indicator
  const { setAuth } = useAuth(); // Auth context to set auth state
  const navigate = useNavigate(); // Use navigate for redirecting

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true); // Set loading state to true
    setError(null); // Reset error state

    try {
      const user = await login(email, password); // Call login from authService
      setAuth(user); // Set auth state from AuthContext
      navigate("/dashboard"); // Redirect to dashboard on successful login
    } catch (err) {
      setError(err.message); // Set error message from the login error
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  return (
    <div className="login-container">
      <h1>Inflo</h1>
      <p>Login to access your account</p>
      {error && <p className="error-message">{error}</p>}{" "}
      {/* Display error if exists */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
