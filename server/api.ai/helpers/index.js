const moment = require('moment-timezone');
const googleHelp = require('./googleHelp');

async function returnTime(location, tz, timeFormat) {
  let tzAtLocation;

  if (location) {
    try {
      const cords = await googleHelp.returnGeo(
        location.city || location.country
      );
      tzAtLocation = await googleHelp.returnTimezone(cords);
    } catch (error) {
      console.error(error);
    }
  }
  const time = moment
    .tz(tzAtLocation ? tzAtLocation.timeZoneId : tz)
    .format(timeFormat);
  return time;
}

module.exports = {
  returnTime
};
