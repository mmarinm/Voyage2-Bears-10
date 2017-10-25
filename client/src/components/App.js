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

//    this.handleChange = this.handleChange.bind(this);
//    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    getBotMessage(msg => this.props.newBotMessage(msg));
  }

  // componentDidMount() {
  //   getBotMessage(msg =>
  //     this.setState({ ...this.state, messages: [...this.state.messages, msg] })
  //   );
  // }

  render() {
    console.log(this.props, "props from action");
    return (
      <div>
        <MessageContainer />
        <MessageBar />
      </div>
    );
  }
}

// const mapStateToProps = state => ({
//   messages: state.messages
// })

const mapDispatchToProps = dispatch => ({
  newUserMessage,
  newBotMessage
})

export default connect(null, mapDispatchToProps)(App);
