const keys = require('../../config/keys');
const apiai = require('apiai')(keys.APIAI_KEY);
const actions = require('./actions');
// process.env.APIAI_KEY;

function processResponse(resp) {
  const { parameters, action } = resp.result;
  if (action) {
    return actions[action](parameters);
  } else {
    return 'No action';
  }
}

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

const processMessage = async msg => {
  try {
    const response = await aiRequest(msg);
    return processResponse(response);
  } catch (error) {
    console.error(error);
  }
};

module.exports = processMessage;
