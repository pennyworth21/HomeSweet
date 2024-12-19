import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for API calls
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the token
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          const response = await api.post("/auth/refresh", { refreshToken });
          const { access_token } = response.data;

          // Save new token and retry the original request
          localStorage.setItem("authToken", access_token);
          originalRequest.headers.Authorization = `Bearer ${access_token}`;

          return api(originalRequest);
        }
      } catch (refreshError) {
        // Handle token refresh failure
        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
      }
    }

    // Log the error with Rollbar if available
    if (process.env.NODE_ENV !== "test") {
      import("./rollbar").then(({ default: rollbar }) => {
        rollbar.error(error.response?.data || error.message, error);
      });
    }

    return Promise.reject(error);
  },
);

// API functions

/**
 * Login user.
 * @param {string} username - Username.
 * @param {string} password - Password.
 * @returns {Promise<Object>} - Login response.
 */
export const login = async (username, password) => {
  try {
    const response = await api.post("/login", { username, password });
    const { access_token, refresh_token } = response.data;

    // Save the token in local storage
    localStorage.setItem("authToken", access_token);
    localStorage.setItem("refreshToken", refresh_token);

    return response.data;
  } catch (error) {
    // Specific error message based on response
    throw new Error(
      error.response?.data?.message ||
        "Failed to log in. Please check your credentials.",
    );
  }
};

/**
 * Search for documents.
 * @param {string} query - Search query.
 * @returns {Promise<Object>} - Search results.
 */
export const searchDocuments = async (query) => {
  try {
    const response = await api.get("/documents/search", { params: { query } });
    return response.data;
  } catch (error) {
    // Specific error message based on response
    throw new Error(
      error.response?.data?.message ||
        "Failed to search documents. Please try again later.",
    );
  }
};

/**
 * Upload a document.
 * @param {FormData} formData - FormData containing the document.
 * @returns {Promise<Object>} - Upload response.
 */
export const uploadDocument = async (formData) => {
  try {
    const response = await api.post("/documents/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    // Specific error message based on response
    throw new Error(
      error.response?.data?.message ||
        "Failed to upload document. Please try again later.",
    );
  }
};

/**
 * Fetch a document by ID.
 * @param {string} id - Document ID.
 * @returns {Promise<Object>} - Document data.
 */
export const getDocument = async (id) => {
  try {
    const response = await api.get(`/documents/${id}`);
    return response.data;
  } catch (error) {
    // Specific error message based on response
    throw new Error(
      error.response?.data?.message ||
        "Failed to fetch document. Please try again later.",
    );
  }
};

/**
 * Logout user.
 * @returns {Promise<void>}
 */
export const logout = async () => {
  try {
    await api.post("/logout");
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
  } catch (error) {
    // Specific error message based on response
    throw new Error(
      error.response?.data?.message ||
        "Failed to log out. Please try again later.",
    );
  }
};

export default api;
