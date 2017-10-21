const { returnGeo, returnTimezone } = require('./helpers/timez.js');
const moment = require('moment-timezone');

// const actions = {
//   'time.get': async function(params) {
//     const time = await returnTime(params);
//     return { result: time };
//   },
//   'default.welcome': function(params) {
//     return {
//       result:
//         'Hello! Welcome to TimeBot! You can say things like, " What time is it in Arizona?".'
//     };
//   }
// };

const actions = {
  'date.get': async (pars, tz) => {
    // if parametar is sys type date api will return date in '2017-10-11' format
    // for example if the query is what date is tomorrow. Only tomorrow is sys type date
    // so api will recognize tomorrow and return correct date
    let tzAtLocation;

    if (pars.location) {
      try {
        const cords = await returnGeo(
          pars.location.city || pars.location.country
        );
        tzAtLocation = await returnTimezone(cords);
      } catch (error) {
        console.log(error);
      }
    }

    const time = moment
      .tz(tzAtLocation.timeZoneId || tz)
      .format('MMMM Do YYYY');
    return time;
  },

  'date.check': (pars, tz) => {
    console.log('I am supposed to check date');

    return 'yes';
  },

  'time.get': async (pars, tz) => {
    if (pars.location) {
      try {
        const cords = await returnGeo(
          pars.location.city || pars.location.country
        );
        tzAtLocation = await returnTimezone(cords);
      } catch (error) {
        console.log(error);
      }
    }

    const time = moment.tz(tzAtLocation.timeZoneId || tz); //* timezone_string = "Australia/Sydney" */
    var timestring = time.format('h:mm a');

    return timestring;
  }
};

module.exports = actions;
