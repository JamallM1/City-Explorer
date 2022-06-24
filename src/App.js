import React from 'react';
import axios from 'axios';
import Display from './Display';
import Weather from './Weather';
import Movies from './movies';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      city: '',
      cityData: {},
      error: false,
      errorMessage: '',
      weatherData: [],
      movieData: []
    }
  }

  handleCitySubmit = async (e) => {
    e.preventDefault();
    let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_KEY}&q=${this.state.city}&format=json`;
    let cityInfo = await axios.get(url).catch(this.catch);

    let cityForecast = await axios.get(`${process.env.REACT_APP_SERVER}/weather?searchQueryCity=${this.state.city}`).catch(err => {
      console.log(err);
    });
    let cityMovie = await axios.get(`${process.env.REACT_APP_SERVER}/movies?searchQueryCity=${this.state.city}`).catch(err => {
      console.log(err);
    });

    let forecast = [];
    if (!!cityForecast) {
      forecast = cityForecast.data;
    }

    console.log(forecast, 'forecast');
    if (!cityInfo) return
    this.setState({
      cityData: cityInfo.data[0],
      error: false,
      errorMessage: '',
      weatherData: forecast,
      movieData: cityMovie.data
      })

    }; 

  catch = (error) => {
        console.log(error, 'here is an error')
        this.setState({
          error: true,
          // errorMessage: `An error occured: ${error.response.status}`,
          errorMessage: `ERROR ${error.response.status}: Could not find ${this.state.city}`,
          cityData: {}
        })

      }

  handleCityInput = (e) => {
        this.setState({
          city: e.target.value
        })

      }

  render() {

        console.log(this.state);
        console.log(this.state.weatherData);
        console.log(this.state.movieData);
        return (
          <>
          <Display
            handleCityInput={this.handleCityInput}
            handleCitySubmit={this.handleCitySubmit}
            error={this.state.error}
            errorMessage={this.state.errorMessage}
            cityData={this.state.cityData}
            weatherData={this.state.weatherData}
            movieData={this.state.movieData}
            />
            <Movies
            movie={this.state.movieData}/>
          </>

        );
      }
    };
    export default App;