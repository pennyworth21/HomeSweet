import { render, screen } from "@testing-library/react";
import React from "react"; // Added React import
import Spinner from "../Common/Spinner";

describe("Spinner Component", () => {
  test("renders spinner", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toBeInTheDocument(); // Assuming the spinner has a role of "status"
  });
});
