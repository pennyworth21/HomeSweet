import React from "react"; // Added React import
import { render, screen } from "@testing-library/react";
import Search from "../pages/Search";

describe("Search Component", () => {
  test("renders search input", () => {
    render(<Search />);
    expect(screen.getByPlaceholderText(/Search.../)).toBeInTheDocument(); // Adjust placeholder text as necessary
  });
});
