const Express = require('express');
const compression = require('compression');
const path = require('path');

const app = new Express();
app.use(compression());

// express will serve up production assets
// like our main.js file or main.css file

app.use(Express.static('client/build'));

// express will serve up the index.html file
// if it doesn't recognize the route

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

module.exports = app;
