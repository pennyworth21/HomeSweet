import { getAuthToken } from "./storageUtils";

// Create headers with authentication token
export const createAuthHeaders = () => {
  const token = getAuthToken();
  return {
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  };
};

// Handle API errors
export const handleApiError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const { status, data } = error.response;

    switch (status) {
      case 400:
        return {
          type: "VALIDATION_ERROR",
          message: data?.message || "Invalid request. Please check your input.",
        };
      case 401:
        return {
          type: "AUTH_ERROR",
          message: "Authentication failed. Please log in again.",
        };
      case 403:
        return {
          type: "PERMISSION_ERROR",
          message: "You do not have permission to perform this action.",
        };
      case 404:
        return {
          type: "NOT_FOUND",
          message: data?.message || "The requested resource was not found.",
        };
      case 429:
        return {
          type: "RATE_LIMIT",
          message: "Too many requests. Please try again later.",
        };
      case 500:
        return {
          type: "SERVER_ERROR",
          message: "An internal server error occurred. Please try again later.",
        };
      default:
        return {
          type: "UNKNOWN_ERROR",
          message: "An unexpected error occurred. Please try again.",
        };
    }
  } else if (error.request) {
    // The request was made but no response was received
    return {
      type: "NETWORK_ERROR",
      message:
        "Unable to connect to the server. Please check your internet connection.",
    };
  } else {
    // Something happened in setting up the request
    return {
      type: "REQUEST_ERROR",
      message: "An error occurred while processing your request.",
    };
  }
};

// Parse query parameters
export const parseQueryParams = (params) => {
  if (!params || typeof params !== "object") return "";

  const queryString = Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return value
          .map(
            (item) => `${encodeURIComponent(key)}=${encodeURIComponent(item)}`,
          )
          .join("&");
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join("&");

  return queryString ? `?${queryString}` : "";
};

// Format API URL
export const formatApiUrl = (endpoint, params) => {
  const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";
  const queryString = parseQueryParams(params);
  return `${baseUrl}${endpoint}${queryString}`;
};

// Check if response is JSON
export const isJsonResponse = (response) => {
  const contentType = response.headers.get("content-type");
  return contentType && contentType.includes("application/json");
};

export default {
  createAuthHeaders,
  handleApiError,
  parseQueryParams,
  formatApiUrl,
  isJsonResponse,
};
