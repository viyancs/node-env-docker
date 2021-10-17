const config = {
	mode: 'jit',
	purge: ['./src/**/*.{html,js,svelte,ts}', './node_modules/@specta-app/core/src/**/*.svelte'],
	theme: {
		extend: {}
	},
	plugins: [require('@tailwindcss/forms')]
};

module.exports = config;
