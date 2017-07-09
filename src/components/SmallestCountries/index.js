import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import Country from './components/Country';

import axios from 'axios';
import { groupBy, min, keys } from 'underscore';

class SmallestCountries extends Component {

  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      totalCountries: 0,
      totalPop: 0
    };
  }

  getCountries() {
    axios.get(`http://api.population.io:80/1.0/countries`)
      .then(res => {
        const countriesByLength = groupBy(res.data.countries, 'length');
        const smallestCountries = countriesByLength[min(keys(countriesByLength).map(Number))];
        this.setState({ countries: smallestCountries, totalCountries: smallestCountries.length });
      });
  }

  addPop(pop) {
    let currentPop = this.state.totalPop;
    this.setState({totalPop: currentPop += pop});
  }

  render() {
    const countries = this.state.countries.map((country) => {
      return (
        <Country key={country} country={country} addPop={this.addPop.bind(this)}/>
      )
    })
    return (
      <div className="SmallestCountries">
        <h2>Shortest Country Names</h2>
        <p>{this.state.totalPop}</p>
        <p>{this.state.totalCountries}</p>
        <Button onClick={this.getCountries.bind(this)}>Fetch</Button>
        {countries}
      </div>
    );
  }
}

export default SmallestCountries;
