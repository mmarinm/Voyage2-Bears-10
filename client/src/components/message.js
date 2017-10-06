import React from 'react';
import { Col } from 'react-bootstrap';

const styleUser = {
  float: 'right',
  background: 'blue'
};

const styleBot = {
  float: 'left',
  background: 'red'
};

const Message  = (props) =>  {
  const { messageText, userMessage } = props.data;
  return (
    <Col xs={12}>
      <h3 className='Message' style={userMessage ? styleUser : styleBot}>{messageText}</h3>
    </Col>
  );
}

export default Message;
