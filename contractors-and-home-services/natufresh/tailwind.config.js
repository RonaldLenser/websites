/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // NatuFresh — matched to provided logo (forest “Natu”, blue “Fresh”, tagline navy, leaf accent)
        navy: "#1A2B48",
        "deep-blue": "#2E5B9A",
        "eco-green": "#1B5E20",
        "fresh-green": "#4CAF50",
        "soft-blue": "#E3EAF2",
        "soft-green": "#E6F0E8",
        "warm-white": "#F4F7F4",
        "light-gray": "#E4E8E3",
        "dark-text": "#1A2B48",
        greige: "#C3CCC4",
        ocean: "#1565C0",
      },
      fontFamily: {
        /** Display: matches logo wordmark (serif) */
        serif: [
          '"Cormorant Garamond"',
          "Georgia",
          "Cambria",
          "Times New Roman",
          "serif",
        ],
        sans: [
          "Inter",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        card:
          "0 4px 24px rgba(26, 43, 72, 0.08), 0 1px 3px rgba(26, 43, 72, 0.05)",
        "card-lg": "0 20px 50px -12px rgba(26, 43, 72, 0.1)",
        header:
          "0 1px 0 0 rgba(26, 43, 72, 0.06), 0 4px 20px rgba(26, 43, 72, 0.04)",
      },
    },
  },
  plugins: [],
};
