import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  // Week 12: GitHub Pages serves the app at /fit5032-week1/.
  // The GitHub Actions workflow sets DEPLOY_TARGET=gh-pages.
  // Local dev and Cloudflare Pages still use '/'.
  base: process.env.DEPLOY_TARGET === 'gh-pages' ? '/fit5032-week1/' : '/',
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
