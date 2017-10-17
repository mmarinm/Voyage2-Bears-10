const returnTime = require('./timez');

const actions = {
  'time.get': async function(params) {
    const locationProperty = Object.getOwnPropertyNames(params.location);
    const location = params.location[locationProperty];
    const time = await returnTime(location);
    return JSON.stringify({ time: time });
  }
};

module.exports = actions;
