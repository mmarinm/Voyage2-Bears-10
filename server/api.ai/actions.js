const returnTime = require('./timez');

const actions = {
  'time.get': async function(params) {
    const time = await returnTime(params);
    return { result: time };
  },
  'default.welcome': function(params) {
    return {
      result:
        'Hello! Welcome to TimeBot! You can say things like, " What time is it in Arizona?".'
    };
  }
};

module.exports = actions;
