import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, loadEnv } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";

function analyticsPlugin(endpoint?: string, websiteId?: string) {
  return {
    name: "analytics",
    transformIndexHtml(html: string) {
      if (!endpoint || !websiteId) return html;

      return html.replace(
        "</body>",
        `    <script defer src="${endpoint}/umami" data-website-id="${websiteId}"></script>\n  </body>`,
      );
    },
  };
}

export default defineConfig(({ mode }) => {
  const envDir = path.resolve(import.meta.dirname);
  const env = loadEnv(mode, envDir, "");

  const plugins = [
    react(),
    tailwindcss(),
    jsxLocPlugin(),
    vitePluginManusRuntime(),
    analyticsPlugin(env.VITE_ANALYTICS_ENDPOINT, env.VITE_ANALYTICS_WEBSITE_ID),
  ];

  return {
    plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir,
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    strictPort: false, // Will find next available port if 3000 is busy
    host: true,
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1",
    ],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
  publicDir: path.resolve(import.meta.dirname, "public"),
  };
});
