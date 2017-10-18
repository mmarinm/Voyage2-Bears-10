const keys = require('../../config/keys');
const googleMapsClient = require('@google/maps').createClient({
  key: keys.API_KEY,
  Promise
});
const momentTimezone = require('moment-timezone');

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
async function returnTime(params) {
  try {
    const locationProperty = Object.getOwnPropertyNames(params.location);
    const location = params.location[locationProperty];
    let time;
    {
      let geo = await returnGeo(location);
      let tz = await returnTimezone(geo);
      time = momentTimezone()
        .tz(tz.timeZoneId)
        .format('LT');
    }
    return time;
  } catch (err) {
    console.error(err);
  }
}

module.exports = returnTime;
