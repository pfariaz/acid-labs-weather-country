const {NODE_ENV} = require('./environment');

exports.isTesting = NODE_ENV === 'test';
exports.isStage = NODE_ENV === 'stage';
exports.isProduction = NODE_ENV === 'production';
exports.isDevelopment = NODE_ENV === 'development';
