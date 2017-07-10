import React, { Component } from 'react';
import { Row, Col, PanelGroup, Panel, ListGroup, ListGroupItem } from 'react-bootstrap';

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

  removePop() {
    this.props.removePop(this.state.total);
  }

  render() {

    return (
      <Row>
        <Col xs={4} xsOffset={4}>
          <PanelGroup accordion>
            <Panel header={this.props.country} bsStyle="primary" eventKey="1" onEntering={this.getPopulation.bind(this)} onExited={this.removePop.bind(this)}>
              <ListGroup fill>
                <ListGroupItem><strong>Total Population:</strong> {this.state.total.toLocaleString()}</ListGroupItem>
                <ListGroupItem><strong>Male Population:</strong> {this.state.males.toLocaleString()}</ListGroupItem>
                <ListGroupItem><strong>Female Population:</strong> {this.state.females.toLocaleString()}</ListGroupItem>
              </ListGroup>
            </Panel>
          </PanelGroup>
        </Col>
      </Row>
    );
  }
}

export default Country;