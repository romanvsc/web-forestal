module.exports = {
    content: [
      './src/**/*.{njk,html,js}'
    ],
    theme: {
      extend: {
        colors: {
          brand: {
            DEFAULT: '#0f766e',
            700: '#065f46',
            500: '#10b981'
          }
        },
        fontFamily: {
          display: ['Manrope Variable', 'Manrope', 'system-ui', 'sans-serif'],
          body: ['Work Sans', 'system-ui', 'sans-serif']
        },
      },
    },
    plugins: [],
  }
