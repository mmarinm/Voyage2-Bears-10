import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, FormControl, Row } from 'react-bootstrap';
import moment from 'moment-timezone';

import { sendMessageToServer, getBotMessage } from '../API/WShelpers';
import { newUserMessage, newBotMessage } from '../actions';

class MessageBar extends Component {
  constructor() {
    super();

    this.state = { messageText: '', tz: '' };
  }

  componentDidMount() {
    this.setState(prevState => ({ ...prevState, tz: moment.tz.guess() }));
  }

  handleChange = event => {
      const newMessage = event.target.value;
      this.setState(prevState => ({ ...prevState, messageText: newMessage }));
    };

  handleSubmit = e => {
    const { messageText, tz } = this.state;
    e.preventDefault();

    if (messageText !== '') {
      //Send the message to the server
      sendMessageToServer({ messageText, tz });
      this.props.newUserMessage(messageText);
      getBotMessage(msg => this.props.newBotMessage);
      this.setState({ messageText: '' });
    }
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
  return bindActionCreators({ newUserMessage, newBotMessage }, dispatch);
}

export default connect(null, mapDispatchToProps)(MessageBar);
