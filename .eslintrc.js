module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:react-hooks/recommended",
    "prettier", // Enforces Prettier formatting rules
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
    "react",
    "jsx-a11y",
    "react-hooks",
    "prettier",
    "tailwindcss", // Add support for Tailwind CSS linting
  ],
  rules: {
    "react/prop-types": "off", // Disable PropTypes checking
    "react/jsx-uses-react": "off", // React 17 JSX Transform does not require this
    "react/jsx-uses-vars": "warn", // Warn on unused variables in JSX
    "no-unused-vars": ["warn", { varsIgnorePattern: "^React$" }], // Warn for unused variables in general, ignore React imports
    eqeqeq: "error", // Enforce strict equality (===)
    "prettier/prettier": "error", // Enforce Prettier formatting
    "tailwindcss/classnames-order": "warn", // Ensure Tailwind classes are ordered
    "tailwindcss/no-custom-classname": "off", // Allow custom class names alongside Tailwind classes
    "react-hooks/rules-of-hooks": "error", // Enforce React hooks rules
    "react-hooks/exhaustive-deps": "warn", // Warn if dependencies of hooks are missing
  },
  settings: {
    react: {
      version: "detect", // Automatically detect the React version
    },
  },
};
