import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        unblocking: resolve(import.meta.dirname, 'unblocking.html'),
        relining: resolve(import.meta.dirname, 'relining.html'),
        cctvSurveys: resolve(import.meta.dirname, 'cctv-surveys.html'),
        groundworks: resolve(import.meta.dirname, 'groundworks.html'),
      },
    },
  },
});
