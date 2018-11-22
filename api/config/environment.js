require('dotenv').config();

const {
    NODE_ENV,
    WEATHER_API_URL,
} = process.env;

module.exports = {
    NODE_ENV,
    WEATHER_API_URL
}