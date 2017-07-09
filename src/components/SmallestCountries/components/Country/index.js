import React, { Component } from 'react';

import axios from 'axios';

class Country extends Component {

  constructor(props) {
    super(props);
    this.state = {
      males: "",
      females: "",
      total: ""
    };
  }

  getPopulation() {
    const url = 'http://api.population.io:80/1.0/population/2017/' + this.props.country + '/18/'
    axios.get(url)
      .then(res => {
        const data = res.data[0];
        this.setState({
          males: data.males,
          females: data.females,
          total: data.total
        });
        this.props.addPop(data.total);
      });
  }

  render() {
    return (
      <div className="Country" onClick={this.getPopulation.bind(this)}>
        {this.props.country}
      </div>
    );
  }
}

export default Country;