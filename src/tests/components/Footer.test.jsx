import { render, screen } from "@testing-library/react";
import React from "react"; // Added React import
import Footer from "../layout/Footer";

describe("Footer Component", () => {
  test("renders footer text", () => {
    render(<Footer />);
    expect(screen.getByText(/Footer Content/)).toBeInTheDocument(); // Adjust text as necessary
  });
});
