import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxWidth: {
       '7xl-plus': '84rem',
      },
    },
  },
  plugins: [],
};
export default config;
