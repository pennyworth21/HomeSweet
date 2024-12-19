import {
  clearAuthTokens,
  clearUserData,
  saveAuthTokens,
  saveUserData,
} from "../utils/storageUtils";
import api from "./api";

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} email
 * @property {string} name
 * @property {string} [role] - Optional user fields as necessary
 */

/**
 * @typedef {Object} AuthResponse
 * @property {string} token
 * @property {string} refreshToken
 * @property {User} user
 */

// Login user
export const login = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    const { token, refreshToken, user } = response.data;

    // Save tokens and user data
    saveAuthTokens(token, refreshToken);
    saveUserData(user);

    return user;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Login failed. Please check your credentials.",
    );
  }
};

// Register new user
export const register = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    const { token, refreshToken, user } = response.data;

    // Save tokens and user data
    saveAuthTokens(token, refreshToken);
    saveUserData(user);

    return user;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Registration failed. Please try again.",
    );
  }
};

// Logout user
export const logout = async () => {
  try {
    await api.post("/auth/logout");
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    clearAuthTokens();
    clearUserData();
  }
};

// Refresh access token
export const refreshToken = async () => {
  try {
    const response = await api.post("/auth/refresh");
    const { token, refreshToken } = response.data;

    saveAuthTokens(token, refreshToken); // Ensure tokens are refreshed
    return token;
  } catch (error) {
    clearAuthTokens();
    clearUserData();
    throw new Error("Session expired. Please login again.");
  }
};

// Request password reset
export const requestPasswordReset = async (email) => {
  try {
    await api.post("/auth/reset-password-request", { email });
    return true;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Failed to request password reset. Please try again.",
    );
  }
};

// Reset password with token
export const resetPassword = async (token, newPassword) => {
  try {
    await api.post("/auth/reset-password", { token, newPassword });
    return true;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Failed to reset password. Please try again.",
    );
  }
};

// Change password (authenticated)
export const changePassword = async (currentPassword, newPassword) => {
  try {
    await api.post("/auth/change-password", { currentPassword, newPassword });
    return true;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Failed to change password. Please try again.",
    );
  }
};

// Update user profile
export const updateProfile = async (userData) => {
  try {
    const response = await api.put("/auth/profile", userData);
    const updatedUser = response.data.user;
    saveUserData(updatedUser); // Save updated user data

    return updatedUser;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Failed to update profile. Please try again.",
    );
  }
};

export default {
  login,
  register,
  logout,
  refreshToken,
  requestPasswordReset,
  resetPassword,
  changePassword,
  updateProfile,
};
