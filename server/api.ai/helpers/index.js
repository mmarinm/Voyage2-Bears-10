const moment = require('moment-timezone');
const { returnGeo, returnTimezone } = require('./googleHelp');

async function returnTime(location, tz, timeFormat) {
  let tzAtLocation;

  if (location) {
    try {
      const cords = await returnGeo(
        location.city || location.country || location
      );
      tzAtLocation = await returnTimezone(cords);
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
