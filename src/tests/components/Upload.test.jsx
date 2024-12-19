import { render, screen } from "@testing-library/react";
import React from "react"; // Added React import
import Upload from "../pages/Upload";

describe("Upload Component", () => {
  test("renders upload button", () => {
    render(<Upload />);
    expect(screen.getByText(/Upload File/)).toBeInTheDocument(); // Adjust button text as necessary
  });
});
