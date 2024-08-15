import { defineConfig } from "vite";
import wpPlugin from "./src/index";
import { resolve } from "path";

export default defineConfig({
    plugins: [wpPlugin()],
    build: {
        lib: {
            entry: resolve(__dirname, "src/wp-plugin/wp-plugin.js"),
            name: "wp-builder",
            fileName: "wp-builder"
        },
        rollupOptions: {
            external: ["jsdom", "prettier"]
        }
    }
})