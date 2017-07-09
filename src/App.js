import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

import Ranking from './components/Ranking';
import SmallestCountries from './components/SmallestCountries';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      worldPop: 0,
      statesPop: 0
    };
  }

  componentDidMount() {
    // var worldPop, statesPop, smallestCountries, ranking;
    axios.get(`http://api.population.io:80/1.0/population/World/today-and-tomorrow/`)
      .then(res => {
        const worldPop = res.data.total_population[0].population;
        this.setState({ worldPop });
      });
    
    axios.get(`http://api.population.io:80/1.0/population/United States/today-and-tomorrow/`)
      .then(res => {
        // console.log(res)
        const statesPop = res.data.total_population[0].population;
        // const posts = res.data.data.children.map(obj => obj.data);
        this.setState({ statesPop });
      });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>The World of Population</h2>
        </div>
        <div className="App-flex">
          <div>
            <h2>World Population</h2>
            <p>{this.state.worldPop.toLocaleString()}</p>
          </div>
          <div>
            <h2>US Population</h2>
            <p>{this.state.statesPop.toLocaleString()}</p>
          </div>
        </div>
        <div>
          <SmallestCountries/>
        </div>
        <div>
          <Ranking/>
        </div>
      </div>
    );
  }
}

export default App;
