import React, { useState } from "react";
import { searchDocuments } from "../../services/api"; // Importing the searchDocuments function
import ResponsePanel from "../panels/ResponsePanel";

const Search = () => {
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setError("Please enter a search query");
      return;
    }

    setSearching(true);
    setError("");
    setResults(null);

    try {
      const response = await searchDocuments(query);
      setResults(response.documents); // Assuming the API returns documents in the 'documents' field
    } catch (err) {
      setError(err.message || "Failed to perform search. Please try again.");
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">
        Search Documents
      </h1>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex flex-col gap-4 sm:flex-row">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your search query..."
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Search query input"
          />
          <button
            type="submit"
            disabled={searching}
            className={`rounded-lg px-6 py-2 font-semibold ${
              searching
                ? "cursor-not-allowed bg-gray-300"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            aria-label="Search button"
          >
            {searching ? "Searching..." : "Search"}
          </button>
        </div>
      </form>

      {/* Error Message */}
      {error && (
        <div
          className="mb-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
          role="alert"
        >
          {error}
        </div>
      )}

      {/* Search Results */}
      {results && results.length > 0 ? (
        <ResponsePanel results={results} query={query} />
      ) : (
        results && (
          <div className="mt-4 text-center text-gray-600" role="status">
            No documents found matching your query.
          </div>
        )
      )}
    </div>
  );
};

export default Search;
