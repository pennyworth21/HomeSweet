import * as Rollbar from "rollbar";

// Initialize Rollbar
const rollbar = new Rollbar({
  accessToken: "677379a83ec94c419d20bb0d69fa5b35",
  captureUncaught: true,
  captureUnhandledRejections: true,
});

export default {
  error: (message, error) => {
    console.error("Rollbar Error:", message, error);
    rollbar.error(message, error);
  },
};
