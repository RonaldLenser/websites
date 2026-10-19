import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Production: must match the GitHub repo name (GitHub Pages: /REPO_NAME/)
// Development: / so http://localhost:5173/ works
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === "production" ? "/NatuFresh/" : "/",
  server: {
    open: true,
  },
}));
