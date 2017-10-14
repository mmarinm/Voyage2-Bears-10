const keys = require('../../config/keys');
const apiai = require('apiai')(keys.APIAI_KEY);
const moment = require('moment-timezone');

const actions = {
  'date.get': (pars, tz) => {
    // if parametar is sys type date api will return date in '2017-10-11' format
    // for example if the query is what date is tomorrow. Only tomorrow is sys type date
    // so api will recognize tomorrow and return correct date
    if (pars.location) {
      //get timezone for either pars.location.city || pars.location.country
    }
    const time = moment.tz(tz).format('MMMM Do YYYY');
    return time;
  },
  'date.check': (pars, tz) => {
    console.log('I am supposed to check date');

    return 'yes';
  },
  'time.get': (pars, tz) => {
    if (pars.location) {
      //get timezone for either pars.location.city || pars.location.country
    }
    const time = moment.tz(tz) //* timezone_string = "Australia/Sydney" */
    var timestring = time.format('h:mm a');
    return timestring;
  }
};

const getApiAiResp = msg => {
  return new Promise((resolve, reject) => {
    const request = apiai.textRequest(msg, {
      sessionId: 'randomId123'
    });
    request.on('response', res => {
      resolve(res);
    });

    request.on('error', err => {
      reject(err);
    });
    request.end();
  });
};

const processResp = resp => {
  // console.log(resp);
  const { parameters, action } = resp.result;
  // will parse time zone for the server location. In development it will work correctly,
  // but in production this value has to come from the client
  const TZ = moment.tz.guess();
  //this might be misspeled
  fakeTZ = 'America/Los_Angeles';
  if (action) {
    return actions[action](parameters, TZ);
  }
  return 'There is no action implemented yet for the intent';
};

const processMessage = async msg => {
  try {
    const resp = await getApiAiResp(msg);
    return processResp(resp);
  } catch (error) {
    console.log(error);
  }
};

module.exports = processMessage;
