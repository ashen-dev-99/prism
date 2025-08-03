import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, '../index.html'),
        dashboard: resolve(__dirname, '../src/html/pages/dashboard.html'),
        login: resolve(__dirname, '../src/html/pages/login.html'),
        settings: resolve(__dirname, '../src/html/pages/settings.html')
      }
    }
  },
  server: {
    port: 3000,
    open: true
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/scss/utils/_variables.scss";`
      }
    }
  }
}) 