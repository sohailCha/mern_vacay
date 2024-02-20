/** @type {import('tailwindcss').Config} */

import defaultTheme from 'tailwindcss/defaultTheme'

export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				theme: '#6A5ACD',
				secondaryColor: '#FF6B6B',
			},
			width: {
				inherit: 'inherit',
			},
		},
		container: {
			padding: {
				md: '2rem',
				lg: '5rem',
				xl: '10rem',
			},
		},
		screens: {
			xs: '500px',
			...defaultTheme.screens,
		},
	},
	plugins: [],
}
