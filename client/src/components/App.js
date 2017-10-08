import React, { Component } from 'react';

import MessageBar from './message-bar';
import MessageContainer from './message-container';
import '../App.css';


export default class App extends Component {
  render() {
    return (
      <div>
        <MessageContainer />
        <MessageBar />
      </div>
    );
  }
}
