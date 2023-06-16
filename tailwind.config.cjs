/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    screens: {
      md: '768px',
      // tablet

      lg: '1024px',
      // tablet grande e notebook pequeno

      xl: '1280px',
      // notebook

      '2xl': '1536px',
      // desktop
    },
    colors: {
      cWhite: '#ffffff',
      cMdWhite: '#f1f1f1',
      cDkWhite: '#eeeeee',
      cLtBlack: '#121212',
      cMdBlack: '#070707',
      cDkBlack: '#000000',
      cBlackTransp: '#11111170',
      cCian: '#56fddc',
      cGreen: '#55fddc',
      cRed: '#B30000',
      tPrimary: '#262626',
      tSecondary: '#ACACAC',
    },
    borderWidth: {
      1: '1px',
    },
  },
  plugins: [],
};
