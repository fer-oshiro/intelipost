import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
      "@styles": path.resolve(__dirname, "src/styles"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: ["./src/styles"],
      },
    },
  },
});
