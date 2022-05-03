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
      }
    },
  },
  plugins: [require('@tailwindcss/forms'),],
}
