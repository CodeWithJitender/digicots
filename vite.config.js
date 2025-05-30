import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    exclude: ['three'], // Add this line
  },
  build: {
    chunkSizeWarningLimit: 2000, // default is 500
  },
  base: '/',  // <---- important
})