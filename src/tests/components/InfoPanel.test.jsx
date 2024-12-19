import { render, screen } from "@testing-library/react";
import React from "react"; // Added React import
import InfoPanel from "../panels/InfoPanel";

describe("InfoPanel Component", () => {
  test("renders info panel content", () => {
    render(<InfoPanel />);
    expect(screen.getByText(/Info Panel Content/)).toBeInTheDocument(); // Adjust text as necessary
  });
});
