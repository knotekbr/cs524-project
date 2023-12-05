import path from "path";

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import viteTsConfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "REACT_APP_");

  return {
    plugins: [react(), viteTsConfigPaths()],
    server: {
      open: true,
      port: 4200,
    },
    resolve: {
      alias: {
        "~api": path.resolve(__dirname, "./src/services/api"),
        "~app": path.resolve(__dirname, "./src"),
        "~assets": path.resolve(__dirname, "./src/assets"),
        "~components": path.resolve(__dirname, "./src/components"),
        "~hooks": path.resolve(__dirname, "./src/global/hooks"),
        "~pages": path.resolve(__dirname, "./src/pages"),
        "~router": path.resolve(__dirname, "./src/router"),
        "~state": path.resolve(__dirname, "./src/state"),
        "~themes": path.resolve(__dirname, "./src/themes"),
      },
    },
    define: {
      "ENV.API_BASE_URL": JSON.stringify(env.REACT_APP_API_URL),
      "ENV.WS_BASE_URL": JSON.stringify(env.REACT_APP_WS_URL),
      "ENV.WS_PATH": JSON.stringify(env.REACT_APP_WS_PATH),
    },
  };
});
