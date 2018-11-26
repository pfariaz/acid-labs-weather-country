const request = require('../helpers/request');
const {GET} = require('../config/constants');
const {WEATHER_API_URL, WEATHER_API_KEY} = require('../config/environment');
const {read, write} = require('../helpers/redisUtils');

const checkIfRequestFailed = () => {
    if(Math.random() < 0.1){
        return true;
    }
}

const getForecast = (latitude, longitude) => {
    console.log(`STARTING TO REQUEST :${WEATHER_API_URL}/${WEATHER_API_KEY}/${latitude},${longitude}`)
    return request({
        url: `${WEATHER_API_URL}/${WEATHER_API_KEY}/${latitude},${longitude}`,
        method: GET,
        timeout: 60000,
        qs: {
            exclude:'flags,minutely,hourly,daily,alerts'
        },
        json: true,
    }, true).then(res => res.body);
};

const getForecastByCoordinates = (latitude, longitude) => {
    const redisKeyResponse = `${latitude},${longitude}`;
    if (checkIfRequestFailed()) {
        console.error('Ops! the request to forecast api was failed, retrying...');
        return getForecastByCoordinates(latitude, longitude);
    }
    return read(redisKeyResponse).then(responseCached => {
        if(!responseCached) return getForecast(latitude, longitude).then(resp =>
            write(redisKeyResponse, resp, 60*60).then(() => resp));
        return responseCached;
    });
   
};

module.exports = {getForecastByCoordinates};
    