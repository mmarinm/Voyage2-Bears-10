const server = require('./')
const SocketIO = require('socket.io');

function createSocket(server) {
  let io = new SocketIO(server);

  io.on('connection', client => {
    client.on('client message', msg => {
      console.log(msg);
      client.emit('bot message', 'hello from server');
    });
  });
}

module.exports = createSocket;
