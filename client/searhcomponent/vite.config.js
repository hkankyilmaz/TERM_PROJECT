import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import federation from '@originjs/vite-plugin-federation'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5001
  },
  plugins: [
    react(),
    federation({

      name: 'button',
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/Button.jsx'
      },
      shared: ['react', 'react-dom'],


    })
  ],
  build: {
    target: "esnext",
  }
})
