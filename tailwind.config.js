module.exports = {
  content: ["./src/**/*.{jsx,js}"],
  
  theme: {
    extend: {
      colors: {
        'bgGradient' : '#212f30', // from-gray-900 to-bgGradient
        'wText' : '#e8e3e3', // Used for white text. Pure white hurts the eyes
        // main color for bg: gray-900
        // main color for cyan: cyan-400-500
        // main color for orange: orange-500
      },
      minWidth: {
        '3/4' : '75%',
        '1/4' : '25%',
        '1/2' : '50%',
        '65%' : '65%',
      },
      minHeight: {
        '150' : 150,
      }
    },
  },
  plugins: [require('@tailwindcss/forms'),],
}
