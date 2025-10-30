/** @type {import('tailwindcss').Config} */
module.exports = {
  // IMPORTANT: include every place you will use `className="..."`
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],

  // Pull in NativeWind’s preset (gives you RN-friendly defaults)
  presets: [require("nativewind/preset")],

  theme: {
    extend: {},
  },
  plugins: [],
};
