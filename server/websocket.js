const server = require("./");
const SocketIO = require("socket.io");
const apiai = require("apiai");
const apiController = apiai(process.env.APIAI_KEY);

function createSocket(server) {
  let io = new SocketIO(server);
  io.on("connection", client => {
    client.on("client message", msg => {
      let request = apiController.textRequest(msg, {
        sessionId: "timebot"
      });
      request.on("response", response => {
        client.emit("bot message", response);
      });
      request.on("error", error => {
        client.emit("bot message", error);
      });
      request.end();
    });
  });
}
module.exports = createSocket;
