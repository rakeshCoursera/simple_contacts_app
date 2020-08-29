const http = require('http');
const app = require('./app');
const config = require('./config/config');

const port = process.env.PORT || config.port;

const server = http.createServer(app);

console.log(`Listening: http://localhost:${port}`);
server.listen(port);
