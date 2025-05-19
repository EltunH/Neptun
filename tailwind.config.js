/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{htm,js}"],
  theme: {
    screens: {
      'small': "315px",
      'xxs': "415px",
      'xs': "480px",
      'xms': "520px",
      'mini': '500px',
      'sm': '640px',
      'md': '768px',
      'slm': '991px',
      'lg': '1024px',
      'hd': "1169px",
      'mls': '1100px',
      'mlg': '1200px',
      'xl': '1280px',
      'sxl': '1352px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        noto: ['"Noto Sans"', 'sans-serif'],
      },
    },
    plugins: [],
  }
}

