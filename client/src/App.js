import React, { Component } from 'react';
import './App.css';
import { Map, GoogleApiWrapper } from "google-maps-react";
import { REACT_APP_GOOGLE_API_KEY } from './config/environment';
import { searchCountryInfoByCode } from './services/getInfoCountry';
import { searchGeocodingByCoordinates } from './services/googleGeocoding';
import { getWeatherByCoordinates } from './services/weatherForecast';
import Modal from 'react-responsive-modal';

class App extends Component {

  initialState = {
    open: false,
    country: '',
    capitalCity: '',
    currentTemp: 0,
  };

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  onMapClicked = (mapProps, map, event) => {
    const latitude = event.latLng.lat();
    const longitude = event.latLng.lng();

    searchGeocodingByCoordinates(longitude, latitude).then(resultGeocoding => {
      const reversedResults = resultGeocoding.results.reverse();
      const countryName = reversedResults[0].formatted_address;
      const longCountry = reversedResults[0].geometry.location.lng;
      const latCountry = reversedResults[0].geometry.location.lat;
      const codeCountry = reversedResults[0].address_components[0].short_name;
      
      return searchCountryInfoByCode(codeCountry).then(resultCountryName => {
        const capitalCity = resultCountryName.capital;
        return getWeatherByCoordinates(longCountry, latCountry).then(resultWeather => {
          const currentTemp = ((resultWeather.currently.temperature - 32) * (5/9)).toFixed(1);

          this.setState({
            open: true,
            country: countryName,
            capitalCity,
            currentTemp,
          });

        });
      });
    }).catch(error => {
      console.log(error);
      this.setState({
        open: true,
        country: 'COUNTRY',
        capitalCity: 'NOT FOUND',
        currentTemp: 0,
      });
    });

  };

  onCloseModal = () => {
    this.setState({ open: false });
  };
  
  render() {
    const { open, country, capitalCity, currentTemp } = this.state;
    return (
      <div>
        <Map
          google={this.props.google}
          onClick={this.onMapClicked}
          zoom={4}
          maxZoom={4}
          minZoom={4}
        />
        <Modal open={open} onClose={this.onCloseModal} center>
          <h3>{country} - {capitalCity}</h3>
          <h4>Current temperature: {currentTemp} Cº</h4>
        </Modal>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: REACT_APP_GOOGLE_API_KEY
})(App);
