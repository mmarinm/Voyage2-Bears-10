const apiai = require('apiai')(process.env.APIAI_KEY);

const processMessage = msg => {
  console.log(msg);
  return new Promise((resolve, reject) => {
    const request = apiai.textRequest('Is today Saturday?', {
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
