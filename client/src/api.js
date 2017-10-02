import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:5000');

function encapsMessage(clientMessage) {
  return function subscribeToTimer(cb) {
    socket.on('bot message', botMessage => cb(null, botMessage));
    socket.emit('client message', clientMessage);
  }
}

export { encapsMessage };
