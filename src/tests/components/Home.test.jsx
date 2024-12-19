import { render, screen } from "@testing-library/react";
import React from "react"; // Added React import
import Home from "../pages/Home";

describe("Home Component", () => {
  test("renders home page", () => {
    render(<Home />);
    expect(screen.getByText(/Home Page Content/)).toBeInTheDocument(); // Adjust text as necessary
  });
});
