import express from 'express';
import { createServer } from 'http';
import { dirname,join } from 'path';
import { fileURLToPath } from 'url';
import {createProxyMiddleware} from 'http-proxy-middleware';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const port:string = process.env.PORT || '4000';
const app = express();
const router = express.Router();
const proxyTargetGQL = process.env.GQL_HOST;
const ctxPath = process.env.CTX_PATH || '/';
console.log(proxyTargetGQL);
app.use(ctxPath, router);
router.use(express.static(join(__dirname, './static')))
router.get('/auth', (req,res) => {
    console.log('auth endpoint called');
});
const wsProxy = createProxyMiddleware(`${ctxPath.length>1?ctxPath:''}/gql/*`, {target: proxyTargetGQL, ws:true, 
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
router.use(wsProxy);

//app.use('/gql/*', (req,res,next) => {console.log('reached'); next();}, proxy('http://localhost:8085'));

const server = createServer(app);

server.listen(port, () => {
    console.log(`server listening on port ${port}`);
});
server.on('upgrade', wsProxy.upgrade); // <-- subscribe to http 'upgrade'
