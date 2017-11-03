const { returnTime } = require('./helpers');
const {
  returnGeo,
  returnTimezone,
  fetchTZforLocation
} = require('./helpers/googleHelp');
const moment = require('moment-timezone');

const actions = {
  'date.get': (pars, tz) => {
    const { location } = pars;

    return returnTime(location, tz, 'MMMM Do YYYY');
  },

  'date.check': async (pars, tz) => {
    console.log(pars, tz);
    const { location } = pars;
    let now;

    //get date at param location
    now = location
      ? await returnTime(location, tz, 'MMMM Do YYYY')
      : moment.tz(Date.now(), tz).format('MMMM Do YYYY');

    //get date at clients location
    const date = moment.tz(pars.date, tz).format('MMMM Do YYYY');

    console.log(date, 'date');
    console.log(now, 'now');

    console.log(date === now);

    return date === now
      ? `Yes, it's ${now}
            ${location ? 'in ' + (location.city || location.country) : ''}
            `
      : `No, it's ${now}
            ${location ? 'in ' + (location.city || location.country) : ''}
            `;
  },

  'time.get': async (pars, tz) => {
    const { location } = pars;

    return returnTime(location, tz, 'h:mm a');
  },

  'time.time_zones': async (pars, tz) => {
    const { location } = pars;
    const geo = await returnGeo(location.city || location.country);
    const timezone = await returnTimezone(geo);
    return timezone.timeZoneName;
  }
};

module.exports = actions;
