import { defineConfig } from 'vite';
// Exemple de configuration d'alias dans vite.config.js

import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve( 'src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5174
  }
});


