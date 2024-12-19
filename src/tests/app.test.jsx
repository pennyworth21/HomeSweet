import { render, screen } from "@testing-library/react";
import React from "react"; // Import React
import App from "../App"; // Import the App component

describe("App Component", () => {
  beforeEach(() => {
    render(<App />);
  });

  test("renders without crashing", () => {
    expect(screen.getByText(/Welcome to Inflow/i)).toBeInTheDocument();
    expect(screen.getByText(/Welcome to Inflow/i)).toBeVisible();
  });

  test("renders the correct title", () => {
    expect(screen.getByRole("heading")).toHaveTextContent("App");
  });
});
