import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  // GitHub Pages(/portfolio/) 같은 하위 경로에서도 열리게 상대 경로로 빌드
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },

  server: {
    host: true,
    port: 3070,
  },
});
