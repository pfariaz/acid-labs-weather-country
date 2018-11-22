const {getForecastByCoordinates} = require('../services/weatherAPI');

exports.getWeather = (req, res) => {
    return getForecastByCoordinates(req.query.lat,req.query.long)
        .then(responseForecast => res.send(responseForecast))
        .catch(error => res.status(500).send(error));
};