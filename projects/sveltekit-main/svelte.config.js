import preprocess from 'svelte-preprocess';
import { config as dotenv } from 'dotenv';
import path from 'path'

dotenv({ path: './node_modules/@specta-app/core/.env' });

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',

		vite: {
			define: {
				API_KEY: JSON.stringify(process.env.API_KEY),
				AUTH_DOMAIN: JSON.stringify(process.env.AUTH_DOMAIN),
				PROJECT_ID: JSON.stringify(process.env.PROJECT_ID),
				STORAGE_BUCKET: JSON.stringify(process.env.STORAGE_BUCKET),
				MESSAGING_SENDER_ID: JSON.stringify(process.env.MESSAGING_SENDER_ID),
				APP_ID: JSON.stringify(process.env.APP_ID),
				MEASUREMENT_ID: JSON.stringify(process.env.MEASUREMENT_ID),
				NODE_ENV: JSON.stringify(process.env.NODE_ENV)
			},
			resolve: {
				alias: {
					components: path.resolve('./src/components')
				}
			},
			ssr: {
				external: ['firebase', 'firebase/functions', 'firebase/firestore', 'firebase/auth', 'firebase/storage', 'svelte-loading-spinners']
			},
			optimizeDeps: {
				exclude: ["@fullcalendar/core", "@fullcalendar/daygrid", "@fullcalendar/list", "@fullcalendar/timegrid"]
			},
      
			server: {
				fs: {
				  // Allow serving files from one level up to the project root
				  allow: ['..', '.']
				}
			}
		}
	},

	preprocess: [
		preprocess({
			postcss: true
		})
	]
};

export default config;

// Workaround until SvelteKit uses Vite 2.3.8 (and it's confirmed to fix the Tailwind JIT problem)
const mode = process.env.NODE_ENV;
const dev = mode === 'development';
process.env.TAILWIND_MODE = dev ? 'watch' : 'build';
