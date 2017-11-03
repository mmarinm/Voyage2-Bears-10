import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MessageBar from './message-bar';
import MessageContainer from './message-container';
import { getBotMessage } from '../API/WShelpers';
import { newBotMessage } from '../actions';
import '../App.css';


class App extends Component {
  componentDidMount() {
    getBotMessage(msg => this.props.newBotMessage(msg));
  }

  render() {
    console.log(this.props, 'props from action');
    return (
      <div>
        <MessageContainer />
        <MessageBar />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => { newBotMessage }

export default connect(null, mapDispatchToProps)(App);
