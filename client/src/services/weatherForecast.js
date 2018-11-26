import axios from "axios";

const getWeatherByCoordinates = (longitude, latitude) =>
    axios.get(`/api/api/v1/weather?lat=${latitude}&long=${longitude}`)
    .then(response => response.data);

export {
    getWeatherByCoordinates
}