import { defineConfig, UserConfigExport } from "vite";
import pluginSolid from 'vite-plugin-solid';

let useProxy = false;

let config: UserConfigExport = {
    plugins: [pluginSolid()],
    server: {
        port: 3001,
    },
}

if (useProxy) {
    config.server.proxy = {
        '/register': {
            changeOrigin: true,
            /*headers: {
                origin: 'http://localhost:3000'
            },*/
            xfwd: true,
            target: 'http://localhost:8088',
            ws: true
        },
        '/login': {
            headers: {
                origin: 'http://localhost:3000'
            },
            target: 'http://localhost:8088',
            ws: true,
            xfwd: true,
        },
        '/query': {
            changeOrigin: true,
            /*headers: {
                origin: 'http://localhost:3000',
            },*/
            target: 'http://localhost:8085',
            xfwd: true,
            ws: true
        }
    }
}

export default defineConfig(config)