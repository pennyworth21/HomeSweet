/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Tailwind will scan all JS, JSX, TS, and TSX files in the src folder
    "./public/index.html", // Also scan the index.html file in the public folder
  ],
  theme: {
    extend: {
      // You can extend the default Tailwind theme here, if needed
    },
  },
  plugins: [
    require("@tailwindcss/forms"), // For better form element styling
    require("@tailwindcss/typography"), // For prose (typography) styling
    require("@tailwindcss/aspect-ratio"), // For controlling aspect ratio of elements
    require("@tailwindcss/line-clamp"), // For truncating text with an ellipsis after a certain number of lines
  ],
};
