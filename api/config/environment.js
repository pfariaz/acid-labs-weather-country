require('dotenv').config();

const {
    NODE_ENV,
    WEATHER_API_URL,
    WEATHER_API_KEY,
    REDIS_HOST,
    REDIS_PORT,
    REDIS_PASSWORD
} = process.env;

module.exports = {
    NODE_ENV,
    WEATHER_API_URL,
    WEATHER_API_KEY,
    REDIS_HOST,
    REDIS_PORT,
    REDIS_PASSWORD
}