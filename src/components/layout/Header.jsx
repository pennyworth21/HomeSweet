import { useRollbar } from "@rollbar/react"; // Import Rollbar for error monitoring
import React, { useState } from "react"; // Import React and useState
import { Link, NavLink } from "react-router-dom"; // Import Link and NavLink for routing

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu toggle
  const rollbar = useRollbar(); // Rollbar instance for error monitoring

  // Function to toggle the mobile menu
  const handleToggleMenu = () => {
    try {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    } catch (error) {
      rollbar.error("Error toggling mobile menu", error); // Capture errors with Rollbar
    }
  };

  return (
    <header className="bg-blue-600 text-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold">
            Inflo
          </Link>

          {/* Hamburger Menu Button for Mobile */}
          <button
            className="block focus:outline-none focus:ring-2 focus:ring-white md:hidden"
            aria-label="Toggle navigation menu"
            onClick={handleToggleMenu}
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden space-x-4 md:flex">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:text-gray-300 ${isActive ? "text-white font-semibold" : "text-gray-200"}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/upload"
              className={({ isActive }) =>
                `hover:text-gray-300 ${isActive ? "text-white font-semibold" : "text-gray-200"}`
              }
            >
              Upload
            </NavLink>
            <NavLink
              to="/search"
              className={({ isActive }) =>
                `hover:text-gray-300 ${isActive ? "text-white font-semibold" : "text-gray-200"}`
              }
            >
              Search
            </NavLink>
          </nav>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <nav className="rounded bg-blue-700 p-4 md:hidden">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block py-2 hover:text-gray-300 ${isActive ? "text-white font-semibold" : "text-gray-200"}`
              }
              onClick={handleToggleMenu}
            >
              Home
            </NavLink>
            <NavLink
              to="/upload"
              className={({ isActive }) =>
                `block py-2 hover:text-gray-300 ${isActive ? "text-white font-semibold" : "text-gray-200"}`
              }
              onClick={handleToggleMenu}
            >
              Upload
            </NavLink>
            <NavLink
              to="/search"
              className={({ isActive }) =>
                `block py-2 hover:text-gray-300 ${isActive ? "text-white font-semibold" : "text-gray-200"}`
              }
              onClick={handleToggleMenu}
            >
              Search
            </NavLink>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
