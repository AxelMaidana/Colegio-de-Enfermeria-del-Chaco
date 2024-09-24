import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */

export default {
	content: [
	  "./src/**/*.{html,js,jsx,ts,tsx,astro}",  // Asegúrate de incluir todos los archivos relevantes
	],
	theme: {
	  extend: {
		fontFamily: {
			sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
		},
		colors: {
		  customBlue: '#187498',
		  customGreen: '#36AE7C',
		  customBlack: '#2E2E2E',
		  customCyan: '#4DC9DE',
		},
	  },
	},
	plugins: [],
  }
  