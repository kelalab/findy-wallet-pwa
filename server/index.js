import express from 'express';
import { createServer } from 'http';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const port = process.env.Port || '3000';
const app = express();
app.use(express.static(join(__dirname, '../build')));
const server = createServer(app);
server.listen(port, () => {
    console.log(`server listening on port ${port}`);
});
