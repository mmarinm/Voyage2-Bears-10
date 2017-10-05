import React, { Component } from 'react';
import { Col } from 'react-bootstrap';

const styleUser = {
  float: 'right',
  background: 'blue'
};
const styleBot = {
  float: 'left',
  background: 'red'
};

class Message extends Component {
  render() {
    return (
      <Col
        xs={12}>
        <h3 className='Message' style={styleUser}>{this.props.message}</h3>
      </Col>
    );
  }
}

export default Message;
