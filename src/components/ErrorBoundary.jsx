import React from "react";
import rollbar from "../rollbar"; // Import Rollbar for error tracking

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    // State to track if an error has occurred
    this.state = { hasError: false };
  }

  // Update state if an error is thrown
  static getDerivedStateFromError() {
    return { hasError: true }; // Fallback UI will be rendered
  }

  // Log error details to Rollbar
  componentDidCatch(error, errorInfo) {
    rollbar.error("Unhandled React error", error, { errorInfo });
  }

  render() {
    // If there's an error, show fallback UI
    if (this.state.hasError) {
      return (
        <div className="flex h-screen items-center justify-center">
          <h1 className="text-xl font-semibold text-red-600">
            Oops! Something went wrong. Please try refreshing the page.
          </h1>
        </div>
      );
    }

    // Render children if no error
    return this.props.children;
  }
}

export default ErrorBoundary;
