export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Yield AI Color Theme
        sidebar: {
          bg: '#6A4A3C',
          active: '#8B5E3C',
          text: '#F9F3EC',
          hover: '#9C6B4A',
        },
        page: {
          bg: '#F5E9D8',
        },
        card: {
          bg: '#FFFFFF',
        },
        text: {
          primary: '#3B2A1A',
          secondary: '#6B4E3A',
        },
        accent: '#C08D4D',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
