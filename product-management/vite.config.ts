import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/product-management/', // Only add this if deploying to a subfolder
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  server: {
    port: 3000, // Updated port
    host: true, // Listen on all network interfaces
    open: true, // Open browser automatically
  },
})
