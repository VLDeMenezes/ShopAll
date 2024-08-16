import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        basicColor: "#FFFF",
        blackColor: "#000000",
        successColor: "#22c55e",
        primaryColor: "#1E3A8A",
        secondaryColor: "#1F2937",
        detailsColor: "#10B9",
        borderColor: "#f3f4f6",
        hoverColor: "#1d4ed8",
      },
    },
  },
  plugins: [],
};
export default config;
