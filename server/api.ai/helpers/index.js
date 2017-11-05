const moment = require('moment-timezone');
const { returnGeo, returnTimezone } = require('./googleHelp');

async function returnTime(location, tz, timeFormat) {
  let tzAtLocation;

  if (location) {
    try {
      const cords = await returnGeo(
        location['admin-area'] || location.city || location.country || location
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

function addLocation(message, location) {
  const loc =
    location['admin-area'] || location.city || location.country || location;
  if (loc) {
    return message + ' in ' + loc;
  }
  return message;
}

function timeDifferResp(location1, location2, hDiff, mDiff) {
  const loc1 =
    location1['admin-area'] || location1.city || location1.country || location1;
  const loc2 =
    location2['admin-area'] || location2.city || location2.country || location2;

  if (hDiff === 0) {
    if (mDiff === 0) {
      return `${loc1} and ${loc2} are in the same zone`;
    }
    if (mDiff > 0) {
      return `${loc1} is ${mDiff > 0
        ? ` ${mDiff} minutes`
        : ' '} behind the ${loc2}`;
    }
    return `${loc1} is ${mDiff < 0
      ? ` ${Math.abs(mDiff)} minutes`
      : ' '} ahead the ${loc2}`;
  }

  if ((hDiff > 0 && mDiff === 0) || mDiff > 0) {
    return `${loc1} is ${hDiff} ${hDiff !== 1 ? 'hours' : 'hour'}${mDiff > 0
      ? ` and ${mDiff} minutes`
      : ' '} behind the ${loc2}`;
  }

  if ((hDiff < 0 && mDiff === 0) || mDiff < 0) {
    absHdif = Math.abs(hDiff);
    absMdiff = Math.abs(mDiff);

    return `${loc1} is ${absHdif} ${absHdif !== 1
      ? 'hours'
      : 'hour'}${absMdiff > 0
      ? ` and ${absMdiff} minutes`
      : ' '} ahead the ${loc2}`;
  }
}

module.exports = {
  returnTime,
  addLocation,
  timeDifferResp
};
