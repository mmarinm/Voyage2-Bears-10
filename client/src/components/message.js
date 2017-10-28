import React from 'react';
import { Row } from 'react-bootstrap';

const styleUser = {
  float: 'right',
  background: '#cccccc'
};
const styleBot = {
  float: 'left',
  background: '#999999'
};

const Message = props => {
  const { messageText, isUserMessage, timestamp } = props.data;
  return (
    <Row>
      <div style={{ textAlign: isUserMessage ? 'right' : 'left' }}>
        {isUserMessage ? 'Sent' : 'Received'}: {timestamp.toLocaleTimeString()}
      </div>
      <h3 className="Message" style={isUserMessage ? styleUser : styleBot}>
        {messageText}
      </h3>
    </Row>
  );
};

export default Message;
