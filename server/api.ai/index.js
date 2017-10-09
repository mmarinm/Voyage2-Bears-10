const keys= require('../../config/keys')
const apiai = require('apiai')(keys.APIAI_KEY);

// process.env.APIAI_KEY;

const processMessage = msg => {
  console.log(msg);
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

module.exports = processMessage;
