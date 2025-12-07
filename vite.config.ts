/// <reference types="vitest/config" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '@styles': '/src/styles',
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: ['./src/styles'],
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/tests/setupTests.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    css: true,
  },
});
