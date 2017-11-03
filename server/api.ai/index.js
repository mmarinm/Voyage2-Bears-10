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

function processResponse(resp, clientTZ) {
  const { fulfillment, parameters, action } = resp.result;

  //falback if geting TZ on client side failed
  const TZ = clientTZ || moment.tz.guess();

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
  const { messageText, tz } = msg;
  try {
    const response = await aiRequest(messageText);
    return processResponse(response, tz);
  } catch (error) {
    console.error(error);
  }
};

module.exports = processMessage;
