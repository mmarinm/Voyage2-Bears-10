const server = require('./');
const SocketIO = require('socket.io');
const processMessage = require('./api.ai');

function createSocket(server) {
  let io = new SocketIO(server);

  io.on('connection', client => {
    client.on('client message', async msg => {
      const resp = await processMessage(msg);
      console.log('resp', resp);
      client.emit('bot message', resp);
    });
  });

}
module.exports = createSocket;
