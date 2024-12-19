import { render, screen } from "@testing-library/react";
import React from "react"; // Added React import
import Sidebar from "../layout/Sidebar";

describe("Sidebar Component", () => {
  test("renders sidebar", () => {
    render(<Sidebar />);
    expect(screen.getByText(/Sidebar Content/)).toBeInTheDocument(); // Adjust text as necessary
  });
});
