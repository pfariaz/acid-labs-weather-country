import { REACT_APP_COUNTRIES_API_URL } from '../config/environment'
import axios from "axios";

const searchCountryInfoByCode = (countryCode) =>
    axios.get(`${REACT_APP_COUNTRIES_API_URL}/alpha/${countryCode}`)
    .then(response => response.data);

export {
    searchCountryInfoByCode
}