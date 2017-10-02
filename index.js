const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const Express = require('express');
const SocketIO = require('socket.io');

// initialize the server and configure support for ejs templates
const app = new Express();
const server = http.Server(app);
let io = new SocketIO(server);

const publicPath = path.join(__dirname, '/client');

// define the folder that will be used for static assets
app.use(Express.static(path.join(publicPath, 'static')));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

io.on('connection', client => {
  client.on('client message', msg => {
    console.log(msg);
    client.emit('bot message', msg);
  });
});

if (process.env.NODE_ENV === 'production') {
  // express will serve up production assets
  // like our main.js file or main.css file

  app.use(express.static('client/build'));

  // express will serve up the index.html file
  // if it doesn't recognize the route

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// universal routing and rendering
app.get('*', (req, res) => {});

// start the server
const port = process.env.PORT || 5000;
const env = process.env.NODE_ENV || 'development';

server.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
});
