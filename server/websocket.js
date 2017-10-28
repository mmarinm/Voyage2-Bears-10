const server = require('./');
const SocketIO = require('socket.io');
const processMessage = require('./api.ai');

function createSocket(server) {
  let io = new SocketIO(server);

  io.on('connection', client => {
    client.on('client message', async msg => {
      try {
        const resp = await processMessage(msg);
        client.emit('bot message', resp);
      } catch (err) {
        console.error(err);
      }
    });
  });
}
module.exports = createSocket;
