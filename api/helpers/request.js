const request = require('request');
const {logResponse, logStartRequest, logErrorResponseRequest} = require('./logs');

module.exports = (optionsRequest) => {
  logStartRequest(optionsRequest);
  return new Promise((resolve, reject) => {
    request[optionsRequest.method](optionsRequest, (error, response) => {
      if (error) {
        logErrorResponseRequest(Object.assign(error, optionsRequest));
        return reject({statusCode: 500, message: error.message});
      } else {
        logResponse({status: response.statusCode, url: optionsRequest.url,
          method: optionsRequest.method, params: optionsRequest.qs, body: response.body});
        if (response.statusCode < 200 || response.statusCode > 299) {
          return reject({statusCode: response.statusCode, message: response.body});
        }
        return resolve(response);
      }
    });
  });
};