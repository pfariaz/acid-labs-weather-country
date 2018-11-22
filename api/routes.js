// const controller = require('./controllers/controller');
const { getWeather } = require('./controllers/weatherController');

exports.init = app => {
  app.get('/api/v1/weather', [], getWeather);
};