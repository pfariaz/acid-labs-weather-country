import { REACT_APP_WEATHER_API_URL } from '../config/environment'
import axios from "axios";

const getWeatherByCoordinates = (longitude, latitude) =>
    axios.get(`${REACT_APP_WEATHER_API_URL}/api/v1/weather?lat=${latitude}&long=${longitude}`)
    .then(response => response.data);

export {
    getWeatherByCoordinates
}