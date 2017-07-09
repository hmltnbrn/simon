import React, { Component } from 'react';
import { Button, Form, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

import axios from 'axios';

class Ranking extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gender: "",
      dob: "",
      ranking: {}
    };
  }

  handleGender(event) {
    this.setState({gender:event.target.value});
  }

  handleDob(event) {
    this.setState({dob:event.target.value});
  }
  
  getRank() {
    const url = 'http://api.population.io:80/1.0/wp-rank/' + this.state.dob + '/' + this.state.gender + '/World/today/'
    axios.get(url)
      .then(res => {
        const ranking = res.data;
        this.setState({ ranking });
    });
  }

  getValidationState() {
    const length = this.state.dob.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
  }

  render() {
    return (
      <div className="Ranking">
        <h2>Check Your Ranking</h2>
          <Form>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Gender</ControlLabel>
              <FormControl componentClass="select" placeholder="select" onChange={this.handleGender.bind(this)}>
                <option value="select">select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </FormControl>
            </FormGroup>
            <FormGroup
              controlId="formBasicText"
              validationState={this.getValidationState()}
            >
              <ControlLabel>Working example with validation</ControlLabel>
              <FormControl
                type="text"
                value={this.state.dob}
                placeholder="Enter text"
                onChange={this.handleDob.bind(this)}
              />
              <FormControl.Feedback />
              <HelpBlock>Validation is based on string length.</HelpBlock>
            </FormGroup>
            <Button onClick={this.getRank.bind(this)}>Rank Me</Button>
          </Form>
          <p>{this.state.ranking.rank}</p>
      </div>
    );
  }
}

export default Ranking;