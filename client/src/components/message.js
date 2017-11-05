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
      <div style={{textAlign: isUserMessage ? 'right' : 'left'}}>
        {isUserMessage ? 'Sent' : 'Received'}: {timestamp.toLocaleTimeString()}
      </div>
      <h4 className='Message' style={isUserMessage ? styleUser : styleBot}>
        {messageText !== null ? messageText : "Hmm can't find anything, try something else"}
      </h4>
    </Row>
  );
}

export default Message;
