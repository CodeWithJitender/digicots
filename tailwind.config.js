export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inder", "sans-serif"], // Add "sans-serif" as fallback
      },
    },
  },
  plugins: [],
};
