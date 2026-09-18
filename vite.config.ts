import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages sirve el sitio en https://<usuario>.github.io/ponydex/,
  // así que las rutas de los assets tienen que empezar con /ponydex/.
  // En desarrollo (npm run dev) sigue siendo "/" para que localhost funcione igual.
  base: process.env.NODE_ENV === 'production' ? '/ponydex/' : '/',
})
