// Storage keys
const STORAGE_KEYS = {
  AUTH_TOKEN: "authToken",
  REFRESH_TOKEN: "refreshToken",
  USER_DATA: "userData",
  THEME: "theme",
  LANGUAGE: "language",
  RECENT_SEARCHES: "recentSearches",
};

// Save data to localStorage with error handling
export const setItem = (key, value) => {
  try {
    const serializedValue =
      typeof value === "string" ? value : JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
    return true;
  } catch (error) {
    console.error(`Error saving to localStorage: ${error.message}`);
    return false;
  }
};

// Get data from localStorage with error handling
export const getItem = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    if (item === null) return defaultValue;

    try {
      return JSON.parse(item);
    } catch {
      return item;
    }
  } catch (error) {
    console.error(`Error reading from localStorage: ${error.message}`);
    return defaultValue;
  }
};

// Remove item from localStorage
export const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing from localStorage: ${error.message}`);
    return false;
  }
};

// Clear all data from localStorage
export const clearStorage = () => {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error(`Error clearing localStorage: ${error.message}`);
    return false;
  }
};

// Save auth tokens
export const saveAuthTokens = (authToken, refreshToken) => {
  setItem(STORAGE_KEYS.AUTH_TOKEN, authToken);
  setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
};

// Get auth token
export const getAuthToken = () => {
  return getItem(STORAGE_KEYS.AUTH_TOKEN);
};

// Get refresh token
export const getRefreshToken = () => {
  return getItem(STORAGE_KEYS.REFRESH_TOKEN);
};

// Clear auth tokens
export const clearAuthTokens = () => {
  removeItem(STORAGE_KEYS.AUTH_TOKEN);
  removeItem(STORAGE_KEYS.REFRESH_TOKEN);
};

// Save user data
export const saveUserData = (userData) => {
  return setItem(STORAGE_KEYS.USER_DATA, userData);
};

// Get user data
export const getUserData = () => {
  return getItem(STORAGE_KEYS.USER_DATA);
};

// Clear user data
export const clearUserData = () => {
  return removeItem(STORAGE_KEYS.USER_DATA);
};

// Save recent searches (maintain a limited list)
export const saveRecentSearch = (searchQuery, maxItems = 10) => {
  const searches = getItem(STORAGE_KEYS.RECENT_SEARCHES, []);
  const updatedSearches = [
    searchQuery,
    ...searches.filter((search) => search !== searchQuery),
  ].slice(0, maxItems);

  return setItem(STORAGE_KEYS.RECENT_SEARCHES, updatedSearches);
};

// Get recent searches
export const getRecentSearches = () => {
  return getItem(STORAGE_KEYS.RECENT_SEARCHES, []);
};

// Clear recent searches
export const clearRecentSearches = () => {
  return removeItem(STORAGE_KEYS.RECENT_SEARCHES);
};

export default {
  STORAGE_KEYS,
  setItem,
  getItem,
  removeItem,
  clearStorage,
  saveAuthTokens,
  getAuthToken,
  getRefreshToken,
  clearAuthTokens,
  saveUserData,
  getUserData,
  clearUserData,
  saveRecentSearch,
  getRecentSearches,
  clearRecentSearches,
};
