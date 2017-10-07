import React from 'react';
import { Col } from 'react-bootstrap';

const styleUser = {
  float: 'right',
  background: '#cccccc'
};
const styleBot = {
  float: 'left',
  background: '#999999'
};

const Message = (props) => {
  const { messageText, userMessage } = props.data;
  return (
    <Col
      xs={12}>
      <h3 className='Message' style={userMessage ? styleUser : styleBot}>{messageText}</h3>
    </Col>
  );
}

export default Message;
