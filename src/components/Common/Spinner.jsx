import React from "react";
import PropTypes from "prop-types";

const Spinner = ({ size = "md", color = "blue" }) => {
  // Size classes
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  // Color classes
  const colorClasses = {
    blue: "text-blue-500",
    white: "text-white",
    gray: "text-gray-500",
    green: "text-green-500",
  };

  return (
    <div role="status" className="flex items-center space-x-2">
      <svg
        className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]} transform-gpu`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-label="loading"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

Spinner.propTypes = {
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  color: PropTypes.oneOf(["blue", "white", "gray", "green"]),
};

export default Spinner;
