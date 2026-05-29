import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  define: {
    'import.meta.env.VITE_API_URL': JSON.stringify('https://mercapp-api-e0a7.onrender.com')
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://mercapp-api-e0a7.onrender.com',
        changeOrigin: true
      }
    }
  }
})
