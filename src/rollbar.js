import Rollbar from "rollbar";

// Determine environment dynamically
const environment = process.env.NODE_ENV || "development";

// Warn if access token is missing
if (!process.env.REACT_APP_ROLLBAR_POST_TOKEN) {
  console.warn(
    "Rollbar access token is not defined. Error tracking may not work.",
  );
}

// Initialize Rollbar
const rollbar = new Rollbar({
  accessToken: process.env.REACT_APP_ROLLBAR_POST_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment,
  enabled: environment !== "test",
  logLevel: environment === "development" ? "debug" : "error",
  captureLocalhost: environment === "development",
  autoInstrument: {
    log: true,
    network: true,
    dom: true,
  },
  payload: {
    client: {
      javascript: {
        source_map_enabled: true,
        code_version: process.env.REACT_APP_VERSION || "1.0.0",
      },
    },
    person: {
      id: "user_id_here", // Replace with dynamic user info
      username: "username_here",
      email: "user_email_here",
    },
  },
  scrubFields: ["password", "creditCardNumber"],
});

export default rollbar;
