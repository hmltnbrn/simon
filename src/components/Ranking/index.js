import React, { Component } from 'react';
import { Button, Form, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

import RankingCard from './components/RankingCard';

import axios from 'axios';
import moment from 'moment';

class Ranking extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gender: "",
      dob: "",
      ranking: {},
      genderValid: null,
      dobValid: null,
      helpText: ""
    };
  }

  handleGender(event) {
    if(event.target.value === 'select') this.setState({ gender: event.target.value, genderValid: 'error' });
    else this.setState({ gender: event.target.value, genderValid: 'success' });
  }

  handleDob(event) {
    if(moment(event.target.value, "YYYY-MM-DD", true).isValid()) this.setState({dob: event.target.value, dobValid: 'success'});
    else this.setState({ dob: event.target.value, dobValid: 'error' });
  }
  
  getRank() {
    if(this.state.genderValid === 'success' && this.state.dobValid === 'success') {
      const url = 'http://api.population.io:80/1.0/wp-rank/' + this.state.dob + '/' + this.state.gender + '/World/today/'
      axios.get(url)
        .then(res => {
          const ranking = res.data;
          this.setState({ ranking, helpText: "" });
      });
    }
    else {
      this.setState({ helpText: "Please fix your information" });
    }
  }

  clearInfo() {
    this.setState({
      gender: "",
      dob: "",
      ranking: {},
      genderValid: null,
      dobValid: null,
      helpText: ""
    });
  }

  render() {
    return (
      <div className="Ranking">
        <h2>Check Your Ranking</h2>
        <h4>Enter you information to check where you rank</h4>
        <p style={{ color: "red" }}>{this.state.helpText}</p>
          <Form inline>
            <FormGroup
              controlId="genderSelect"
              validationState={this.state.genderValid}
            >
              <ControlLabel>Gender</ControlLabel>
              {' '}
              <FormControl componentClass="select" value={this.state.gender} placeholder="select" onChange={this.handleGender.bind(this)}>
                <option value="select">select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </FormControl>
              <HelpBlock>ex: Male</HelpBlock>
            </FormGroup>
            {' '}
            <FormGroup
              controlId="gobText"
              validationState={this.state.dobValid}
            >
              <ControlLabel>Date of Birth</ControlLabel>
              {' '}
              <FormControl
                type="text"
                value={this.state.dob}
                placeholder="Date of Birth"
                onChange={this.handleDob.bind(this)}
              />
              <FormControl.Feedback />
              <HelpBlock>ex: 1992-04-18</HelpBlock>
            </FormGroup>
            {' '}
            { this.state.ranking.rank === undefined ?
              <Button bsStyle="primary" onClick={this.getRank.bind(this)}>Fetch</Button> :
              <Button bsStyle="danger" onClick={this.clearInfo.bind(this)}>Clear</Button>
            }
          </Form>
          { this.state.ranking.rank !== undefined ?
            <RankingCard gender={this.state.gender} dob={this.state.dob} ranking={this.state.ranking}/> :
            ""
          }
      </div>
    );
  }
}

export default Ranking;