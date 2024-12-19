import React from "react"; // Import React to satisfy the linter

const Footer = () => {
  return (
    <footer className="mt-auto bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Inflow Document Management. All
              rights reserved.
            </p>
          </div>

          <div className="flex space-x-6">
            <a
              href="/privacy"
              className="text-sm text-gray-300 transition duration-200 hover:text-white"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-sm text-gray-300 transition duration-200 hover:text-white"
            >
              Terms of Service
            </a>
            <a
              href="/contact"
              className="text-sm text-gray-300 transition duration-200 hover:text-white"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
