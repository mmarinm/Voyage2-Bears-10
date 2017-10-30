const keys = require('../../../config/keys');
const googleMapsClient = require('@google/maps').createClient({
  key: keys.API_KEY,
  Promise
});

const returnGeo = function returnGeo(location) {
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
};

const returnTimezone = function returnTimezone(coords) {
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
};

const fetchTZforLocation = async location => {
  let tzAtLocation;

  if (location) {
    try {
      const cords = await returnGeo(location.city || location.country);
      tzAtLocation = await returnTimezone(cords);
    } catch (error) {
      console.error(error);
    }
  }
  const time = tzAtLocation ? tzAtLocation.timeZoneId : tz;
  return time;
};

module.exports = {
  returnGeo,
  returnTimezone,
  fetchTZforLocation
};
