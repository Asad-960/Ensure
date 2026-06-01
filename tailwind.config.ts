import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'system-ui',
          '"Segoe UI"',
          'roboto',
          '"Helvetica Neue"',
          'arial',
          '"Noto Sans"',
          'sans-serif',
        ],
      },
      colors: {
        background: "#0A0A0A",
        foreground: "rgba(255, 255, 255, 0.95)",
        secondary: "#0F0F12",
        accent: {
          primary: "#0052FF",
          secondary: "#00D9FF",
          tertiary: "#FF6B35",
        },
        body: "rgba(255, 255, 255, 0.65)",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-hero': 'radial-gradient(circle at center, #1A1A1E 0%, #0A0A0A 70%)',
        'gradient-premium': 'linear-gradient(135deg, #0052FF 0%, #00D9FF 100%)',
        'gradient-dark': 'linear-gradient(180deg, rgba(0, 82, 255, 0.1) 0%, rgba(0, 217, 255, 0.05) 100%)',
      },
      boxShadow: {
        'premium': '0 20px 60px rgba(0, 82, 255, 0.15)',
        'premium-lg': '0 30px 80px rgba(0, 82, 255, 0.2)',
        'glow': '0 0 30px rgba(0, 217, 255, 0.3)',
      },
      backdropBlur: {
        'premium': '12px',
      },
    },
  },
  plugins: [],
};
export default config;
