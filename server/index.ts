import express from 'express';
import { createServer } from 'http';
import { dirname,join } from 'path';
import { fileURLToPath } from 'url';
import {createProxyMiddleware} from 'http-proxy-middleware';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const port:string = process.env.PORT || '4000';
const app = express();

app.use(express.static(join(__dirname, './static')))
app.get('/auth', (req,res) => {
    console.log('auth endpoint called');
});
const wsProxy = createProxyMiddleware('/gql/*', {target: `https://findy.local`, ws:true, 
changeOrigin: true, // needed for virtual hosted sites
selfHandleResponse: false,
secure: false,
onProxyReq: (proxyReq,req,res) => {
    console.log(proxyReq);
},
onProxyRes: (proxyRes,req,res) => {
    console.log(proxyRes.statusCode);
},
onError: (err) => {
    console.log(err);
}
});
app.use(wsProxy);

//app.use('/gql/*', (req,res,next) => {console.log('reached'); next();}, proxy('http://localhost:8085'));

const server = createServer(app);

server.listen(port, () => {
    console.log(`server listening on port ${port}`);
});
server.on('upgrade', wsProxy.upgrade); // <-- subscribe to http 'upgrade'
