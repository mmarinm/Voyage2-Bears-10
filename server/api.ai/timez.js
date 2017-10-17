const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyBEVD-mVG-WRQq2Ye-dwDa_0-zG6D5uvzA',
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
        else resolve(data);
      }
    );
  });
}
function returnTime(location) {
  var geo = returnGeo(location);
  return geo
    .then(data => {
      var tz = returnTimezone(data);
      return tz.then(data => {
        var time = momentTimezone()
          .tz(data.json.timeZoneId)
          .format('LT');
        return time;
      });
    })
    .catch(err => console.error(err));
}

module.exports = returnTime;
