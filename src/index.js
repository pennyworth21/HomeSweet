import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import rollbar from "./rollbar"; // Import Rollbar

// Test Rollbar initialization
rollbar.log("Rollbar is initialized!");

// Get the root element
const container = document.getElementById("root");
if (!container) {
  throw new Error(
    "Root element not found. Ensure your HTML file has a div with id='root'.",
  );
}
const root = createRoot(container);

// Render the app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
