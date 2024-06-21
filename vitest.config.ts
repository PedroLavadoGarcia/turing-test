import { resolve } from "path";
import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: "jsdom",
    name: "front-admin",
    setupFiles: ["./vitest-setup.js"],
    root: "./src",
    server: {
      deps: {
        inline: ["vuetify"],
      },
    },
    coverage: {
      provider: "istanbul",
      exclude: [
        "**/*.test.ts",
        "**/App.vue",
        "**/*.cjs",
        "**/main.tsx",
        "**/mock/**/*",
        "**/utils/firebase/index.js",
        "**/main.ts",
        "**/router/**/*",
        "**/constant/**/*",
        "**/plugins/**/*",
        "**/pages/**/*",
      ],
    },
  },
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "./src") }],
  },
});
