import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, FormControl, Row } from 'react-bootstrap';

import { sendMessageToServer, getBotMessage } from '../API/WShelpers';
import { updateMessages, botMessage } from '../actions';

class MessageBar extends Component {
  constructor(props) {
    super(props);

    this.state = { messageText: '' };
  }

  handleChange = (event) => {
    const newMessage = event.target.value;
    this.setState(prevState => ({ ...prevState, messageText: newMessage }));
  }

  handleSubmit = (e) => {
    const { messageText } = this.state;
    e.preventDefault();

    //Send the message to the server
    sendMessageToServer(messageText);
    this.setState(prevState => ({
      ...prevState,
      messageText: ''
    }));

    this.props.updateMessages(messageText);
    getBotMessage(msg => this.props.botMessage(msg))
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Row>
          <Col xs={9} sm={10} lg={11}>
            <FormControl
              type="text"
              value={this.state.messageText}
              onChange={this.handleChange}
            />
          </Col>
          <Col xs={3} sm={2} lg={1}>
            <Button type="submit" bsStyle="info" block>Send</Button>
          </Col>
        </Row>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ updateMessages, botMessage }, dispatch);
}

export default connect(null, mapDispatchToProps)(MessageBar);
