import React, { Component } from 'react';
import { sendMessageToServer, getBotMessage } from '../API/WShelpers';
import '../App.css';
import MessageContainer from '../containers/message-container';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { newUserMessage, newBotMessage } from '../actions';
import MessageBar from './message-bar';

class App extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    // getBotMessage(msg => this.props.newBotMessage(msg));
    getBotMessage();
  }

  render() {
    console.log(this.props, 'props from app');
    return (
      <div>
        <MessageContainer />
        <MessageBar />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  newUserMessage,
  newBotMessage
});

export default connect(null, mapDispatchToProps)(App);
