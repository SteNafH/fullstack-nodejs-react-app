import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { port: 3000 },
  ssr: {
    format: 'cjs',
  },
  build: {
    emptyOutDir: true,
    outDir: "../../dist/views"
  },
  root: "src/views",
});