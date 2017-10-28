const keys = require('../../config/keys');
const apiai = require('apiai')(keys.APIAI_KEY);
const moment = require('moment-timezone');
const actions = require('./actions');

function aiRequest(msg) {
  return new Promise((resolve, reject) => {
    const request = apiai.textRequest(msg, {
      sessionId: 'randomId123'
    });
    request.on('response', resp => {
      resolve(resp);
    });
    request.on('error', error => {
      reject(error);
    });
    request.end();
  });
}

function processResponse(resp) {
  const { fulfillment, parameters, action } = resp.result;
  // will parse time zone for the server location. In development it will work correctly,
  // but in production this value has to come from the client
  const TZ = moment.tz.guess();
  fakeTZ = 'America/Los_Angeles';

  // fulfillment.speech is there just in default wellcome case
  if (fulfillment.speech) {
    return fulfillment.speech;
  }

  if (action) {
    return actions[action](parameters, TZ);
  }
  return 'There is no action implemented yet for the intent';
}

const processMessage = async msg => {
  try {
    const response = await aiRequest(msg);
    return processResponse(response);
  } catch (error) {
    console.error(error);
  }
};

module.exports = processMessage;
