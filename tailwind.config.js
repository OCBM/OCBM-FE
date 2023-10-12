/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        grey: {
          light: '#AAAAAA',
          dark: '#444444',
        },
        themeColor: '#605BFF',
        textThemeColor: '#5F2EEA',
      },
      backgroundImage: {
        'gradient-24': 'linear-gradient(180deg, #605bff 0%, #0a03d9 100%)',
        'login-bg-image': 'url(/src/assets/images/login-bg.png)',
      },
      backgroundSize: {
        'full-cover': '100% 100%',
      },
      boxShadow: {
        '2xl': '0px 4px 10px 4px rgba(0, 0, 0, 0.10)',
      },
      fontFamily: {
        Gotham: ['Gotham-light'],
        GothamMedium: ['Gotham-medium'],
        GothamBold: ['Gotham-bold'],
        Poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
