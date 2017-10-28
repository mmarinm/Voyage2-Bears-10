const { returnGeo, returnTimezone, returnTime } = require('./helpers');
const moment = require('moment-timezone');

const actions = {
  'date.get': (pars, tz) => {
    const { location } = pars;

    return returnTime(location, tz, 'MMMM Do YYYY');
  },

  'date.check': (pars, tz) => {
    console.log('I am supposed to check date');

    return 'yes';
  },

  'time.get': async (pars, tz) => {
    const { location } = pars;

    return returnTime(location, tz, 'h:mm a');
  }
};

module.exports = actions;
