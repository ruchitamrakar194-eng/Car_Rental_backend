/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-dark": "#0A0E17",
        "sidebar-dark": "#111827",
        "card": "rgba(22, 27, 38, 0.75)", // #161B26 with opacity
        primary: "#00D1FF",
        accent: "#7CFFB2",
        highlight: "#FDBA74",
        text: "#E5E7EB",
        success: "#10B981",
        danger: "#EF4444",
      },
      backdropBlur: {
        xs: "2px",
        sm: "4px",
      },
      boxShadow: {
        glass: "0 4px 30px rgba(0, 0, 0, 0.5)",
        "glow-primary": "0 0 20px rgba(0, 209, 255, 0.3), inset 0 0 10px rgba(0, 209, 255, 0.1)",
        "glow-accent": "0 0 20px rgba(124, 255, 178, 0.3), inset 0 0 10px rgba(124, 255, 178, 0.1)",
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
};
