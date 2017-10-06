import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sendMessageToServer } from '../API/WShelpers';
import { updateMessages, botMessages } from '../actions';
import { Form, FormControl, Button, Row, Col } from 'react-bootstrap';

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
    setTimeout(() => {
      this.props.botMessages("Did you say " + messageText + "?")
    }, 1000)
  }

  render() {
    return (
      <Form inline onSubmit={this.handleSubmit}>
        <Row>
          <Col xs={9}>
            <FormControl
              type="text"
              value={this.state.message}
              onChange={this.handleChange}
            />
          </Col>
          <Col xs={3}>
            <Button type="submit">Send</Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ updateMessages, botMessages }, dispatch);
}

export default connect(null, mapDispatchToProps)(MessageBar);
