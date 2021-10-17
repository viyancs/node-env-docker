const config = {
	mode: "jit",
	purge: [
		"./src/**/*.{html,js,svelte,ts}", "./node_modules/@specta/core/src/**/*.{html,js,svelte,ts}",
	],
	theme: {
		extend: {},
	},
	plugins: [],
};

module.exports = config;
