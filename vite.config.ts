import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr'; // svg to react component

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3001,
  },
  build: {
    manifest: true,
    minify: true,
  },
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@c': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@p': fileURLToPath(new URL('./src/pages', import.meta.url)),
    },
  },
});
