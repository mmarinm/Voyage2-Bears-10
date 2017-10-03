import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:5000');

function getBotMessage() {
  socket.on('bot message', (msg) => {
    console.log(msg)
  } );
}

function sendMessageToServer(clientMessage) {
    socket.emit('client message', clientMessage);
}


export { getBotMessage, sendMessageToServer };
