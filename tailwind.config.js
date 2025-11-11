/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      colors: {
        primary: "#2B6CB0", // Elegant blue
        accent: "#F59E0B", // Warm amber
        background: "#F9FAFB",
        darkBg: "#0F172A",
        border: "#E5E7EB",
        muted: "#F3F4F6",
      },
      boxShadow: {
        soft: "0 8px 20px rgba(0,0,0,0.08)",
        glow: "0 0 10px rgba(245,158,11,0.4)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/line-clamp")],
};
