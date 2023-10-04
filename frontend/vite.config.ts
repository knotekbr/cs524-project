import path from "path";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsConfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteTsConfigPaths()],
  server: {
    open: true,
    port: 4200,
  },
  resolve: {
    alias: {
      "~app": path.resolve(__dirname, "./src"),
      "~assets": path.resolve(__dirname, "./src/assets"),
      "~components": path.resolve(__dirname, "./src/components"),
      "~pages": path.resolve(__dirname, "./src/pages"),
      "~router": path.resolve(__dirname, "./src/router"),
      "~themes": path.resolve(__dirname, "./src/themes"),
    },
  },
});
