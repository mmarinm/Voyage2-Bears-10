import openSocket from 'socket.io-client';
import { newBotMessage } from '../actions/index.js';
import store from '../store.js';
const socket = openSocket('http://localhost:5000');

//messages travel in real time thats why we don't need async await
// but will be necessary when we add async api request in index.js

function getBotMessage() {
  socket.on('bot message', msg => {
    store.dispatch(newBotMessage(msg));
  });
}

function sendMessageToServer(clientMessage) {
  socket.emit('client message', clientMessage);
}

export { getBotMessage, sendMessageToServer };
