import { defineConfig } from 'vite'
import { resolve } from 'path'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

export default defineConfig({
  plugins: [
    cssInjectedByJsPlugin({
      topExecutionPriority: false,
      injectCode: (cssCode) => {
        return `if (typeof window !== 'undefined') {
          const style = document.createElement('style');
          style.textContent = \`${cssCode}\`;
          document.head.appendChild(style);
        }`
      }
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'PrismTheme',
      fileName: 'prism-theme',
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') {
            return 'prism-theme.css';
          }
          return assetInfo.name;
        }
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // SCSS options can be added here if needed
      }
    }
  }
})
