const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && typeof onPerfEntry === "function") {
    import("web-vitals")
      .then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        // Register performance metrics with the provided callback
        getCLS(onPerfEntry); // Cumulative Layout Shift
        getFID(onPerfEntry); // First Input Delay
        getFCP(onPerfEntry); // First Contentful Paint
        getLCP(onPerfEntry); // Largest Contentful Paint
        getTTFB(onPerfEntry); // Time to First Byte
      })
      .catch((error) => {
        // Log any errors that occur during the import or metric collection
        console.error("Error·importing·web-vitals:", error);
      });
  }
};

// Example: Optional analytics integration
export const sendToAnalytics = ({ id, name, delta, value }) => {
  // Replace with your preferred analytics service integration
  const analyticsData = {
    metricId: id, // Unique identifier for the metric
    metricName: name, // Name of the metric (e.g., CLS, FID)
    metricDelta: delta, // Difference in metric value since the last report
    metricValue: value, // Current metric value
    timestamp: Date.now(), // When the metric was reported
  };

  // Example: Send the data to an analytics service
  console.log("Sending·to·analytics:", analyticsData);
  // Uncomment and replace with an actual analytics service:
  // fetch('https://analytics.example.com/report', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(analyticsData),
  // });
};

export default reportWebVitals;
