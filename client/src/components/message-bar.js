import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sendMessageToServer, getBotMessage } from '../API/WShelpers';
import { newUserMessage, newBotMessage } from '../actions';
import { Form, FormControl, Button, Row, Col } from 'react-bootstrap';
import moment from 'moment-timezone';

class MessageBar extends Component {
  state = { messageText: '', tz: '' };

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

    //Send the message to the server
    sendMessageToServer({ messageText, tz });

    this.props.newUserMessage(messageText);
    this.setState({ messageText: '' });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Row>
          <Col xs={9} sm={10} lg={11}>
            <FormControl
              type="text"
              value={this.state.messageText}
              onChange={this.handleChange}
            />
          </Col>
          <Col xs={3} sm={2} lg={1}>
            <Button type="submit">Send</Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ newUserMessage, newBotMessage }, dispatch);
};

export default connect(null, mapDispatchToProps)(MessageBar);
