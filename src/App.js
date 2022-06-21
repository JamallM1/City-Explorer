import './App.css';
import axios from 'axios';
import React from 'react';
import Forms from 'Forms';
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      city: '',
      cityData: {}
    }
  }
  handleCityInput = (e) => {
    this.setState = ({
      city: e.target.value
    });
  };

  handleCitySubmit = async (e) => {
    e.preventDefault();
    let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`;
    let cityInfo = await axios.get(url)
  }
}

render() {

  return (
    <>
      <Forms handleCityInput={this.handleCityInput}
        handleSubmit={this.handleCitySubmit}/>

    </>
  );
}
export default App;
