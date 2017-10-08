import React from 'react';
import { Row } from 'react-bootstrap';

const styleUser = {
  float: 'right',
  background: 'blue'
};

const styleBot = {
  float: 'left',
  background: 'red'
};

const Message  = (props) =>  {
  const { messageText, isUserMessage, timestamp } = props.data;
  return (
    <Row className='MessageRow'>
      <div style={{textAlign: isUserMessage ? 'right' : 'left'}}>Sent: {timestamp.toLocaleTimeString()}</div>
      <h3 className='Message' style={isUserMessage ? styleUser : styleBot}>{messageText}</h3>
    </Row>
  );
}

export default Message;
