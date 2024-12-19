import { render, screen } from "@testing-library/react";
import React from "react"; // Added React import
import Button from "../Common/Button";

describe("Button Component", () => {
  test("renders button text", () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText(/Click Me/)).toBeInTheDocument();
  });
});
