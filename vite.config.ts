import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'remoteApp',
      filename: 'remoteEntry.js',
      exposes: {
        './HelloRemote': './src/HelloRemote.tsx'
      },
      shared: ['react', 'react-dom', '@arco-design/web-react']
    })
  ],
  server: {
    port: 3001,
    cors: true,
    hmr: {
      host: 'localhost',
      port: 3001
    }
  },
  build: {
    target: 'esnext',
    terserOptions: {
      compress: {
        unused: true,
        dead_code: true,
      },
    },
    rollupOptions: {
      treeshake: true,
    },
  }
})