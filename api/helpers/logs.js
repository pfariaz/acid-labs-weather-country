const util = require('util');
const {isTesting} = require('../config/environmentMethods');

const logResponse = res => {
  if (isTesting) return;
  console.log(`The request to ${res.url}
    ${res.params ?
    `with params ${util.inspect(res.params, false, null)}` : 'with no params' }
    ${res.additionalHeaders ?
    `with additional headers
    ${util.inspect(res.additionalHeaders, false, null)}` : ''}
    got status ${res.status}
    ${res.body ?
    `and body ${util.inspect(res.body, false, null)}.` : 'with no body.'}`
  );
};

const logStartRequest = () => {
  if (isTesting) return;
  console.log('Starting request...');
};

const logErrorResponseRequest = error => {
  if (isTesting) return;
  logger.error(`The request to ${error.url}
    ${error.params ?
    `with params ${util.inspect(error.params, false, null)}` : 'with no params' }
    ${error.additionalHeaders ?
    `with additional headers
    ${util.inspect(error.additionalHeaders, false, null)}` : 'with no additional headers'}
    was failed.
    cause: ${error.message}
    stack: ${error.stack}`
  );
};


module.exports = {
  logResponse,
  logStartRequest,
  logErrorResponseRequest,
};
