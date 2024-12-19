import { render, screen, fireEvent } from "@testing-library/react";
import React from "react"; // Import React explicitly
import Login from "../pages/Login"; // Ensure this is the correct path to your Login component

describe("Login Component", () => {
  test("renders login form", () => {
    render(<Login />);
    expect(screen.getByText(/Inflo/i)).toBeInTheDocument(); // Check for the heading
  });

  test("form has email and password fields", () => {
    render(<Login />);
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument(); // Check for the email input field
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument(); // Check for the password input field
  });

  test("form submission works", async () => {
    render(<Login />);

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole("button", { name: /Login/i });

    fireEvent.change(emailInput, { target: { value: "testuser@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    // Assuming you handle submission and provide feedback or navigate
    await screen.findByText(/Loading.../); // Wait for loading state
    // If there are any success/error messages
    expect(screen.getByText(/Invalid email or password/i)).toBeInTheDocument(); // Example error
  });
});
