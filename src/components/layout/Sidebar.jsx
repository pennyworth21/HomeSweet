import React from "react"; // Import React
import { Link } from "react-router-dom"; // Import Link for routing

const Sidebar = () => {
  return (
    <aside className="bg-gray-800 text-white w-64 h-full">
      <div className="p-4">
        <h2 className="text-lg font-bold">Menu</h2>
        <ul className="mt-4">
          <li>
            <Link to="/" className="block py-2 hover:bg-gray-700">Home</Link>
          </li>
          <li>
            <Link to="/upload" className="block py-2 hover:bg-gray-700">Upload</Link>
          </li>
          <li>
            <Link to="/search" className="block py-2 hover:bg-gray-700">Search</Link>
          </li>
        </ul>
      </div>
    </aside>
