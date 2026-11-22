import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const dashboardDir = fileURLToPath(new URL(".", import.meta.url));
const repoRoot = fileURLToPath(new URL("..", import.meta.url));

// The dashboard only reads the repo: progress/ and tasks/ are imported as data.
export default defineConfig({
  root: dashboardDir,
  plugins: [react()],
  server: {
    port: 5180,
    open: true,
    fs: { allow: [repoRoot] },
  },
});
