import { render, screen } from "@testing-library/react";
import React from "react"; // Added React import
import ResponsePanel from "../panels/ResponsePanel";

describe("ResponsePanel Component", () => {
  test("renders response panel content", () => {
    render(<ResponsePanel />);
    expect(screen.getByText(/Response Panel Content/)).toBeInTheDocument(); // Adjust text as necessary
  });
});
