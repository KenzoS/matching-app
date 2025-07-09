import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // srcディレクトリを追加
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: { // カスタムカラーを定義
        pink: {
          DEFAULT: '#EC4899', // text-pink-500, bg-pink-500 など
          600: '#DB2777', // hover:bg-pink-600 など
        },
        gray: {
          50: '#F9FAFB', // bg-gray-50
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280', // text-gray-500
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937', // text-gray-800, bg-gray-800
          900: '#111827', // hover:bg-gray-900
        },
      },
    },
  },
  plugins: [],
};
export default config;
