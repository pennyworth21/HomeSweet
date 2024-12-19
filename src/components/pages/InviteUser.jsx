import React, { useState } from "react";
import api from "../../services/api";

const InviteUser = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleInvite = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email) {
      setError("Email is required.");
      return;
    }

    try {
      const response = await api.post("/invite", { email });
      setMessage(response.data.message);
    } catch (err) {
      setError("Failed to send invitation. Please try again.");
      console.error("Error inviting user:", err);
    }
  };

  return (
    <div className="mx-auto max-w-lg px-4 py-10">
      <h1 className="mb-6 text-center text-2xl font-bold">Invite User</h1>
      {message && <p className="mb-4 text-center text-green-600">{message}</p>}
      {error && <p className="mb-4 text-center text-red-600">{error}</p>}
      <form onSubmit={handleInvite} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
        >
          Send Invitation
        </button>
      </form>
    </div>
  );
};

export default InviteUser;
