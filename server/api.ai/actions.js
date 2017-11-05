const { returnTime, addLocation, timeDifferResp } = require('./helpers');
const {
  returnGeo,
  returnTimezone,
  fetchTZforLocation
} = require('./helpers/googleHelp');
const moment = require('moment-timezone');

const actions = {
  'date.get': async (pars, tz) => {
    // ex: what's the date in Paris
    const { location } = pars;
    const date = await returnTime(location, tz, 'MMMM Do YYYY');
    return addLocation(`It's ${date}`, location);
  },

  'date.check': async (pars, tz) => {
    // ex: is it 29th in Japan
    const { location } = pars;
    let now;

    //get date at param location
    now = location
      ? await returnTime(location, tz, 'MMMM Do YYYY')
      : moment.tz(Date.now(), tz).format('MMMM Do YYYY');

    //get date at clients location
    const date = moment.tz(pars.date, tz).format('MMMM Do YYYY');

    return date === now
      ? addLocation(`Yes, it's ${now}`, location)
      : addLocation(`No, it's ${now}`, location);
  },

  'date.between': (pars, tz) => {
    // ex: how many days between today and New Year
    const date1 = moment(pars['date-1']);
    const date2 = moment(pars['date-2']);
    const unit = pars.unit;

    const diff = Math.abs(date1.diff(date2, unit));

    return (
      `There ${diff > 1 ? 'are' : 'is'} ${diff} ${unit}${diff > 1
        ? 's'
        : ''} between ` +
      date1.format('MMMM Do YYYY') +
      ' and ' +
      date2.format('MMMM Do YYYY')
    );
  },

  'time.get': async (pars, tz) => {
    // ex: what's the time in LA
    const { location } = pars;
    const time = await returnTime(location, tz, 'h:mm a');
    return addLocation(`It's ${time}`, location);
  },

  'time.time_zones': async (pars, tz) => {
    //in what time zone is NYC
    const { location } = pars;
    const geo = await returnGeo(location.city || location.country);
    const timezone = await returnTimezone(geo);
    return timezone.timeZoneName;
  },

  'time.time_difference': async (pars, tz) => {
    // find time difference Paris Milan
    const location1 = pars['location-1'];
    const location2 = pars['location-2'];

    try {
      const tz1 = await fetchTZforLocation(location1);
      const tz2 = await fetchTZforLocation(location2);
      const [h1, m1] = moment
        .tz(tz1)
        .format('Z')
        .split(':')
        .map(e => +e);
      const [h2, m2] = moment
        .tz(tz2)
        .format('Z')
        .split(':')
        .map(e => +e);
      const hDiff = h2 - h1;
      const mDiff = m2 - m1;

      return timeDifferResp(location1, location2, hDiff, mDiff);
    } catch (err) {
      console.error(err);
    }
  }
};

module.exports = actions;
