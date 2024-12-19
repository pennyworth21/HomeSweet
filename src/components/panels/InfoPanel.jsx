import React, { useState } from "react";
import InfoPanel from "./InfoPanel"; // Import the InfoPanel component

const SomeComponent = () => {
  const [status, setStatus] = useState(""); // Status can be 'success' or 'error'
  const [message, setMessage] = useState(""); // Message to display in the InfoPanel

  const handleAction = async () => {
    try {
      // Simulate an action
      await performAsyncAction(); // Replace with actual async action
      setStatus("success");
      setMessage("The action was successful!");
    } catch (error) {
      setStatus("error");
      setMessage("Something went wrong!");
    }
  };

  return (
    <div className="p-6">
      <button
        onClick={handleAction}
        aria-label="Perform the action"
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none"
      >
        Perform Action
      </button>

      {message && (
        <InfoPanel
          type={status}
          message={message}
          onClose={() => setMessage("")}
        />
      )}
    </div>
  );
};

export default SomeComponent;
