// const controller = require('./controllers/controller');
const { getWeather } = require('./controllers/weatherController');

exports.init = app => {
  app.get('/v1/weather', [], getWeather);
};