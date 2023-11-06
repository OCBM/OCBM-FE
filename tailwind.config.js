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
        '2xl': '0px 5px 8px 2px rgba(0, 0, 0, 0.10)',
        '3xl': '0px 0px 40px 0px rgba(0, 0, 0, 0.10)',
        'card-shadow': ' 0px 0px 30px 20px rgba(0, 0, 0, 0.08)',
      },
      fontFamily: {
        Gotham: ['Gotham-light'],
        GothamMedium: ['Gotham-medium'],
        GothamBold: ['Gotham-bold'],
        Poppins: ['Poppins', 'sans-serif'],
      },
      screens: {
        xl: [{ min: '1300px', max: '1400px' }],
        // tall: { raw: '(max-height:900px)' },
        tall: { raw: '(min-width: 1339px),(minheight:820px)' },
        laptop: { raw: '(min-width: 1400px),(minheight:800px)' },
        minh: { raw: '(minheight:900px)' },
      },
    },
  },
  plugins: [],
};
