/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all React files in the src folder
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        darkBg: "#1a1a1a",
        darkText: "#f0f0f0",
        lightBg: "#ffffff",
        lightText: "#000000",
        primary: "#007bff",
        secondary: "#6c757d",
        success: "#28a745",
        danger: "#dc3545",
        warning: "#ffc107",
        info: "#17a2b8",
        light: "#f8f9fa",
        dark: "#343a40",
      },
    },
  },
};
