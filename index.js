const server = require('./server');
const app = require('./server/express');
const createSocket = require('./server/websocket');

createSocket(server);

// start the server
const port = process.env.PORT || 5000;
const env = process.env.NODE_ENV || 'development';

process.on('SIGINT', msg => {
  console.log('Just got SIGINTed, but I dont care');
  process.exit(0);
});

server.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
  if (process.send) {
    process.send('ready');
  }
});
