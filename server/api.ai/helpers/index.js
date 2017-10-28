const keys = require('../../../config/keys.js');
const moment = require('moment-timezone');
const googleMapsClient = require('@google/maps').createClient({
  key: keys.API_KEY,
  Promise
});

function returnGeo(location) {
  return new Promise(function(resolve, reject) {
    googleMapsClient.geocode(
      {
        address: location
      },
      (err, data) => {
        if (err) reject(err);
        else resolve(data.json.results[0].geometry.location);
      }
    );
  });
}

function returnTimezone(coords) {
  return new Promise(function(resolve, reject) {
    googleMapsClient.timezone(
      {
        location: {
          lat: coords.lat.toFixed(4),
          lng: coords.lng.toFixed(4)
        },
        timestamp: 1331766000
      },
      (err, data) => {
        if (err) reject(err);
        else resolve(data.json);
      }
    );
  });
}

async function returnTime(location, tz, timeFormat) {
  let tzAtLocation;

  if (location) {
    try {
      const cords = await returnGeo(location.city || location.country);
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
  returnTime,
  returnTimezone,
  returnGeo
};
