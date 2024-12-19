// Format a file size in bytes to a human-readable format
export const formatFileSize = (bytes) => {
  if (isNaN(bytes) || bytes < 0) return "Invalid size";
  if (bytes === 0) return "0 Bytes";

  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
};

// Generate a unique ID
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Format a date to a readable string
export const formatDate = (date) => {
  if (!date) return "";

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  return new Date(date).toLocaleDateString(undefined, options);
};

// Truncate text with ellipsis
export const truncateText = (text, maxLength) => {
  if (!text || text.length <= maxLength) return text;
  return `${text.substr(0, maxLength)}...`;
};

// Debounce function for search inputs
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Extract file extension from filename
export const getFileExtension = (filename) => {
  if (!filename) return "";
  return filename
    .slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2)
    .toLowerCase();
};

// Check if a file type is supported
export const isSupportedFileType = (filename) => {
  const supportedExtensions = ["pdf", "doc", "docx", "dwg"];
  const extension = getFileExtension(filename);
  return supportedExtensions.includes(extension);
};

// Convert bytes to MB
export const bytesToMB = (bytes) => {
  return bytes / (1024 * 1024);
};

// Validate email format
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Create URL-friendly slug from string
export const createSlug = (str) => {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
};
