import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Spinner from "./Spinner";

const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  className = "",
  spinnerPosition = "left",
  ...props
}) => {
  // Base classes
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  // Size classes
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  // Variant classes with a default fallback
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
    outline:
      "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500",
    ghost: "text-gray-600 hover:bg-gray-100 focus:ring-gray-500",
    default: "bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-400",
  };

  // Disabled classes
  const disabledClasses = "opacity-50 cursor-not-allowed";

  // Full width classes
  const widthClasses = fullWidth ? "w-full" : "";

  // Combine all classes dynamically
  const buttonClasses = clsx(
    baseClasses,
    sizeClasses[size],
    variantClasses[variant] || variantClasses.default,
    {
      [disabledClasses]: disabled || loading,
      [widthClasses]: fullWidth,
    },
    className,
  );

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && spinnerPosition === "left" && (
        <Spinner
          size="sm"
          color={
            variant === "outline" || variant === "ghost" ? "blue" : "white"
          }
          className="mr-2"
        />
      )}
      {children}
      {loading && spinnerPosition === "right" && (
        <Spinner
          size="sm"
          color={
            variant === "outline" || variant === "ghost" ? "blue" : "white"
          }
          className="ml-2"
        />
      )}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "danger",
    "success",
    "outline",
    "ghost",
  ]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  spinnerPosition: PropTypes.oneOf(["left", "right"]),
};

export default Button;
