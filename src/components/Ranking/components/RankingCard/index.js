import React, { Component } from 'react';
import { Row, Col, PanelGroup, Panel, ListGroup, ListGroupItem } from 'react-bootstrap';

class RankingCard extends Component {

  render() {
    return (
      <Row>
        <Col xs={4} xsOffset={4}>
          <PanelGroup>
            <Panel header="Your Rank in the World" bsStyle="primary">
              <ListGroup fill>
                <ListGroupItem><strong>You are ranked </strong> {this.props.ranking.rank.toLocaleString()}</ListGroupItem>
                <ListGroupItem><strong>DoB:</strong> {this.props.dob}</ListGroupItem>
                <ListGroupItem><strong>Gender:</strong> {this.props.gender}</ListGroupItem>
              </ListGroup>
            </Panel>
          </PanelGroup>
        </Col>
      </Row>
    );
  }
}

export default RankingCard;