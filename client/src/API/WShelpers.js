import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:5000');

//messages travel in real time thats why we don't need async await
// but will be necessary when we add async api request in index.js
function getBotMessage(cb) {
  socket.on('bot message', msg => {
    cb(msg);
  });
}

function sendMessageToServer(clientMessage) {
  socket.emit('client message', clientMessage);
}

export { getBotMessage, sendMessageToServer };
