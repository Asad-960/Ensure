import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#101010",
        foreground: "rgba(255, 255, 255, 0.9)",
        secondary: "#0A0A0C",
        accent: {
          primary: "#0050FF",
          secondary: "#00D6FF",
        },
        body: "rgba(255, 255, 255, 0.6)",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-hero': 'radial-gradient(circle at center, #151515 0%, #101010 70%)',
      }
    },
  },
  plugins: [],
};
export default config;
