import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import Country from './components/Country';

import axios from 'axios';
import { filter, groupBy, min, keys } from 'underscore';

class SmallestCountries extends Component {

  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      totalCountries: 0,
      totalPop: 0,
      buttonMode: "Fetch"
    };
  }

  handleClick() {
    if (this.state.buttonMode === "Fetch") this.getCountries();
    else this.removeCountries();
  }

  getCountries() {
    axios.get(`http://api.population.io:80/1.0/countries`)
      .then(res => {
        const countriesByLength = groupBy(filter(res.data.countries, function(str) { return str !== str.toUpperCase(); }), 'length');
        const smallestCountries = countriesByLength[min(keys(countriesByLength).map(Number))];
        this.setState({
          countries: smallestCountries,
          totalCountries: smallestCountries.length,
          buttonMode: "Remove"
        });
      });
  }

  removeCountries() {
    this.setState({
      countries: [],
      totalCountries: 0,
      totalPop: 0,
      buttonMode: "Fetch"
    });
  }

  addPop(pop) {
    let currentPop = this.state.totalPop;
    this.setState({totalPop: currentPop += pop});
  }

  removePop(pop) {
    let currentPop = this.state.totalPop;
    this.setState({totalPop: currentPop -= pop});
  }

  render() {
    const countries = this.state.countries.map((country) => {
      return (
        <Country key={country} country={country} addPop={this.addPop.bind(this)} removePop={this.removePop.bind(this)}/>
      )
    })
    return (
      <div className="SmallestCountries">
        <h2>Shortest Country Names</h2>
        <h4>Populations of countries with shortest names</h4>
        <div className="SmallestCountries-info">
          <p>Total Population of Countries: {this.state.totalPop.toLocaleString()}</p>
          <p>Number of Countries: {this.state.totalCountries}</p>
        </div>
        <Button bsStyle="primary" onClick={this.handleClick.bind(this)}>{this.state.buttonMode}</Button>
        {countries}
      </div>
    );
  }
}

export default SmallestCountries;
