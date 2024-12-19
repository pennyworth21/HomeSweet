import { render, screen } from "@testing-library/react";
import React from "react"; // Added React import
import Modal from "../Common/Modal";

describe("Modal Component", () => {
  test("renders modal content", () => {
    render(<Modal>Modal Content</Modal>);
    expect(screen.getByText(/Modal Content/)).toBeInTheDocument();
  });
});
