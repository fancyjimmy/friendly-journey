
/** @type {import('tailwindcss').Config} */
module.exports = {
	// 1. Apply the dark mode class setting:
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
	],
	theme: {
		extend: {},
	},
	plugins: [
		require('@tailwindcss/typography')
		// 3. Append the Skeleton plugin to the end of this list
	]
}
