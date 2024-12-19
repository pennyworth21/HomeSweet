import React from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import Upload from "./Upload";

const Home = () => {
  return (
    <div className="px-4 py-10 text-center">
      {/* Main heading */}
      <h1 className="mb-6 text-4xl font-bold text-gray-800">
        Welcome to Inflo
      </h1>

      {/* Subheading */}
      <p className="mb-8 text-xl text-gray-600">
        Your document management solution
      </p>

      {/* Links to Upload and Search Documents */}
      <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Upload Documents Link */}
        <Link
          to="/upload"
          className="flex flex-col items-center rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
          role="button"
          aria-label="Upload Documents"
        >
          <h2 className="mb-3 text-2xl font-semibold text-gray-800">
            Upload Documents
          </h2>
          <p className="text-center text-gray-600">
            Upload and manage your documents securely.
          </p>
        </Link>

        {/* Search Documents Link */}
        <Link
          to="/search"
          className="flex flex-col items-center rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
          role="button"
          aria-label="Search Documents"
        >
          <h2 className="mb-3 text-2xl font-semibold text-gray-800">
            Search Documents
          </h2>
          <p className="text-center text-gray-600">
            Search through your uploaded documents with ease.
          </p>
        </Link>
      </div>

      {/* Section for Document Management Tools */}
      <div className="mt-10">
        <h2 className="mb-6 text-3xl font-bold text-gray-800">
          Document Management
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Search Component */}
          <Search />

          {/* Upload Component */}
          <Upload />
        </div>
      </div>
    </div>
  );
};

export default Home;
