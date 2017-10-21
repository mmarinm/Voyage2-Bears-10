import React, { Component } from 'react';

import MessageBar from './message-bar';
import MessageContainer from './message-container';
import { sendMessageToServer, getBotMessage } from '../API/WShelpers';
import { newBotMessage } from '../actions';
import '../App.css';


export default class App extends Component {
  componentDidMount() {
    getBotMessage(msg => this.props.newBotMessage(msg));
  }

  render() {
    return (
      <div>
        <MessageContainer />
        <MessageBar />
      </div>
    );
  }
}
