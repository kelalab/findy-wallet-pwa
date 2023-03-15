import { defineConfig } from "vite";
import pluginSolid from 'vite-plugin-solid';

export default defineConfig({
    plugins: [pluginSolid()],
    server: {
        port: 3000
    }
})