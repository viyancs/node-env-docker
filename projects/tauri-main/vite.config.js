import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { config } from 'dotenv'

config({ path: './node_modules/@specta/core/.env.local' })
config()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    port: 3001
  },
  ssr: {
    external: ['firebase']
  },
  optimizeDeps: {
    exclude: ["@fullcalendar/core", '@fullcalendar/daygrid', "@fullcalendar/list", "@fullcalendar/timegrid", "svelte-routing"]
  },
  define: {
    API_KEY: JSON.stringify(process.env.API_KEY),
    AUTH_DOMAIN: JSON.stringify(process.env.AUTH_DOMAIN),
    PROJECT_ID: JSON.stringify(process.env.PROJECT_ID),
    STORAGE_BUCKET: JSON.stringify(process.env.STORAGE_BUCKET),
    MESSAGING_SENDER_ID: JSON.stringify(process.env.MESSAGING_SENDER_ID),
    APP_ID: JSON.stringify(process.env.APP_ID),
    MEASUREMENT_ID: JSON.stringify(process.env.MEASUREMENT_ID),
    IS_PRODUCTION: process.env.NODE_ENV === 'production'
  }

})
