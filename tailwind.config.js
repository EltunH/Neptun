/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{htm,js}"],
  theme: {
    screens: {
      'sm' : '640px',
      'md' : '768px',
      'lg' : '1024px',
      'mlg' : '1200px',
      'xl' : '1280px',
      '2xl' : '1536px',
    },
    extend: {
      fontFamily: {
        noto: ['"Noto Sans"', 'sans-serif'],
      },
    },
    plugins: [],
  }
}

