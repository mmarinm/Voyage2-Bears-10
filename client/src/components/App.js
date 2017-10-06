import React, { Component } from 'react';
import { connect } from 'react-redux';

import MessageBar from './message-bar';
import MessageContainer from './message-container';
//import { sendMessageToServer, getBotMessage } from '../API/WShelpers';
import '../App.css';


export default class App extends Component {
  // componentDidMount() {
  //   getBotMessage(msg =>
  //     this.setState({ ...this.state, messages: [...this.state.messages, msg] })
  //   );
  // }

  render() {
    return (
      <div>
        <MessageContainer />
        <MessageBar />
      </div>
    );
  }
}
