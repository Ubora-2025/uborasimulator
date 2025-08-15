// vite.config.mjs
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Pour la production, utilisez VITE_API_URL défini dans Netlify
// Exemple d'appel API : `${import.meta.env.VITE_API_URL}/endpoint`

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    // Proxy pour le développement local uniquement
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  define: {
    // Permet de sécuriser la variable d'environnement dans le build
    'process.env': {},
  },
});
