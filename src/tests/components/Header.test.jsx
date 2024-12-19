import { RollbarProvider } from "@rollbar/react";
import { render, screen } from "@testing-library/react";
import React from "react";
import Header from "../../components/layout/Header";

describe("Header Component", () => {
  const accessToken = "YOUR_ACCESS_TOKEN";
  const rollbarConfig = { accessToken };

  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renders header text", () => {
    render(
      <RollbarProvider config={rollbarConfig}>
        <Header />
      </RollbarProvider>, // Added comma here
    );
    expect(screen.getByText(/Document Control System/)).toBeInTheDocument();
  });

  test("renders header text with rollbar error", () => {
    const errorSpy = jest.spyOn(console, "error");
    render(
      <RollbarProvider config={rollbarConfig}>
        <Header />
      </RollbarProvider>, // Added comma here
    );
    expect(errorSpy).toHaveBeenCalledTimes(0);
  });
});
