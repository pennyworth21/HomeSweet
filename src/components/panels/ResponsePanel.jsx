import React from "react";
import PropTypes from "prop-types";

const ResponsePanel = ({ results, query }) => {
  if (results.length === 0) {
    return (
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold">
          No results found for &ldquo;{query}&rdquo;
        </h2>
        <p className="text-gray-600">Try adjusting your search query.</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-semibold">
        Search Results for &ldquo;{query}&rdquo;
      </h2>

      <div className="space-y-4">
        {results.map((doc) => (
          <div
            key={doc.id} // Ensure unique key for each document
            className="border-b border-gray-200 pb-4 last:border-0 last:pb-0"
          >
            <h3 className="mb-2 text-lg font-medium text-blue-600">
              {doc.title || "Untitled Document"}
            </h3>

            {doc.description && (
              <p className="mb-2 text-gray-600">{doc.description}</p>
            )}

            {doc.matches && doc.matches.length > 0 && (
              <div className="rounded bg-gray-50 p-3">
                <p className="mb-2 text-sm text-gray-500">Matching content:</p>
                {doc.matches.slice(0, 3).map((match, idx) => (
                  <p key={idx} className="text-sm">
                    ...
                    {match.length > 80 ? match.substring(0, 80) + "..." : match}
                    ...
                  </p>
                ))}
                {doc.matches.length > 3 && (
                  <p className="mt-2 text-sm text-blue-500">
                    + {doc.matches.length - 3} more match
                    {doc.matches.length - 3 > 1 ? "es" : ""}
                  </p>
                )}
              </div>
            )}

            {doc.file_url && (
              <div className="mt-2">
                <a
                  href={doc.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 hover:text-blue-600"
                >
                  View Document →
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

ResponsePanel.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired, // Ensure `id` is required
      title: PropTypes.string,
      description: PropTypes.string,
      file_url: PropTypes.string,
      matches: PropTypes.arrayOf(PropTypes.string),
    }),
  ).isRequired,
  query: PropTypes.string.isRequired,
};

export default ResponsePanel;
