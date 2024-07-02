import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5000
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js'
    }
  },
  plugins: [
    vue(),
    federation({
      name: 'homepage',
      filename: 'remoteEntry.js',
      remotes: {
        button: 'http://localhost:5001/assets/remoteEntry.js'
      }
    }),


  ],
  build: {
    target: "esnext",
  }
})