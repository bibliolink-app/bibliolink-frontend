import path from 'node:path'

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'

// Variables que se publican en el bundle del navegador (son públicas por diseño).
// Solo estas se exponen: cualquier otra variable del entorno (secretos, variables del sistema) queda fuera.
const PUBLIC_ENV_VARS = ['API_URL', 'TURNSTILE_SITE', 'USERWAY_ACCOUNT_ID', 'PAYPAL_CLIENT_ID', 'PAYPAL_PLAN_ID']

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Prefijo '' en loadEnv: lee `.env` y las variables de Vercel sin exigir prefijo.
  const env = loadEnv(mode, process.cwd(), '')
  const values = Object.fromEntries(PUBLIC_ENV_VARS.map((name) => [name, env[name] ?? '']))

  // Sustituye `%NOMBRE%` en index.html (Vite solo lo hace nativamente para variables con prefijo).
  const htmlEnv: Plugin = {
    name: 'html-public-env',
    transformIndexHtml: {
      order: 'pre',
      handler: (html) => html.replace(/%(\w+)%/g, (match, name: string) => values[name] ?? match),
    },
  }

  return {
    plugins: [react(), tailwindcss(), htmlEnv],
    define: Object.fromEntries(
      PUBLIC_ENV_VARS.map((name) => [`import.meta.env.${name}`, JSON.stringify(values[name])]),
    ),
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, './src'),
      },
    },
  }
})
