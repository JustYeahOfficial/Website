import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// GitHub Pages project sites are hosted at /REPOSITORY/.
// Set VITE_BASE_PATH=/REPOSITORY/ in the GitHub Actions workflow.
export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(process.cwd(), "src") } },
  base: process.env.VITE_BASE_PATH || "/",
});
