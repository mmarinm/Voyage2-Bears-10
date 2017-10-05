import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sendMessageToServer } from '../API/WShelpers';
import { updateMessages } from '../actions';

class MessageBar extends Component {
  constructor(props) {
    super(props);

    this.state = { message: '' };
  }

  handleChange = (event) => {
    const newMessage = event.target.value;
    this.setState(prevState => ({ ...prevState, message: newMessage }));
  }

  handleSubmit = (e) => {
    const { message } = this.state;
    e.preventDefault();

    //Send the message to the server
    sendMessageToServer(message);
    this.setState(prevState => ({
      ...prevState,
      message: ''
    }));

    this.props.updateMessages(message);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.message}
          onChange={this.handleChange}
        />
        <button type="submit">Send</button>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ updateMessages }, dispatch);
}

export default connect(null, mapDispatchToProps)(MessageBar);
