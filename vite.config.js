import { defineConfig } from "vite";
import wpPlugin from "./src/wp-plugin/wp-plugin";

export default defineConfig({
    plugins: [wpPlugin()]
})