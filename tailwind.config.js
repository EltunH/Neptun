/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{htm,js}"],
  theme: {
    screens: {
      'mini' : '500px',
      'sm' : '640px',
      'md' : '768px',
      'slm' : '991px',
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

