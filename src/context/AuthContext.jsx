import axios from "axios";
import React, { createContext, useCallback, useEffect, useState } from "react";

// Create context for authentication state
export const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null); // Authentication state
  const [isLoading, setIsLoading] = useState(true); // Loading state to track auth loading

  // Load auth state from localStorage on component mount
  useEffect(() => {
    const loadAuthFromStorage = async () => {
      try {
        const storedAuth = localStorage.getItem("auth");
        if (storedAuth) {
          const authData = JSON.parse(storedAuth);
          if (authData && Date.now() < authData.expires_in * 1000) {
            setAuth(authData); // Parse and set auth if valid
            await axios.get("/auth/verify"); // Optional: Verify token with backend
          } else {
            logout(); // If expired, remove auth
          }
        }
      } catch (error) {
        console.error("Error loading auth state", error);
        setAuth(null); // Clear auth if there is an issue
      } finally {
        setIsLoading(false); // Set loading to false after auth is loaded
      }
    };

    loadAuthFromStorage();
  }, []);

  // useCallback for refreshToken to memoize the function and prevent re-renders
  const refreshToken = useCallback(async () => {
    try {
      const response = await axios.post("/auth/refresh"); // Refresh token request
      const { access_token, token_type, expires_in } = response.data;

      localStorage.setItem(
        "auth",
        JSON.stringify({ access_token, token_type, expires_in }),
      );
      setAuth({ access_token, token_type, expires_in });
    } catch (error) {
      console.error("Token refresh failed", error);
      logout(); // Clear auth if refresh fails
    }
  }, []);

  // useCallback for isAuthenticated to memoize the function and prevent re-renders
  const isAuthenticated = useCallback(() => {
    return auth && Date.now() < auth.expires_in * 1000; // Check token expiry
  }, [auth]);

  // Axios request interceptor for automatic token refresh
  useEffect(() => {
    const axiosInterceptor = axios.interceptors.request.use(
      async (config) => {
        if (auth && !isAuthenticated()) {
          await refreshToken(); // Refresh token if expired
          config.headers["Authorization"] = `Bearer ${auth.access_token}`;
        } else if (auth) {
          config.headers["Authorization"] = `Bearer ${auth.access_token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    return () => {
      axios.interceptors.request.eject(axiosInterceptor);
    };
  }, [auth, isAuthenticated, refreshToken]); // Run interceptor when auth state changes

  const login = async (username, password) => {
    try {
      const response = await axios.post("/auth/token", { username, password });
      const { access_token, token_type, expires_in } = response.data;

      localStorage.setItem(
        "auth",
        JSON.stringify({ access_token, token_type, expires_in }),
      );
      setAuth({ access_token, token_type, expires_in });
    } catch (error) {
      console.error("Login failed", error);
      setAuth(null);
      throw new Error("Login failed. Please check your credentials.");
    }
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setAuth(null);
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        login,
        logout,
        refreshToken,
        isAuthenticated,
        isLoading,
      }}
    >
      {!isLoading && children}{" "}
      {/* Only render children after auth state is loaded */}
    </AuthContext.Provider>
  );
};
