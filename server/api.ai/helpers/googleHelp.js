const keys = require('../../../config/keys');
const googleMapsClient = require('@google/maps').createClient({
  key: keys.API_KEY,
  Promise
});

module.exports.returnGeo = function returnGeo(location) {
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

module.exports.returnTimezone = function returnTimezone(coords) {
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
