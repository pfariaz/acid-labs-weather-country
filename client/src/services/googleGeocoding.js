import { REACT_APP_GOOGLE_GEOCODING_API_URL, REACT_APP_GOOGLE_API_KEY } from '../config/environment'
import axios from "axios";

const searchGeocodingByCoordinates = (longitude, latitude) => 
    axios.get(`${REACT_APP_GOOGLE_GEOCODING_API_URL}?latlng=${latitude},${longitude}&key=${REACT_APP_GOOGLE_API_KEY}`)
    .then(response => response.data);

export {
    searchGeocodingByCoordinates
}