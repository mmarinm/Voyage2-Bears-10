import React, { Component } from 'react';
import { sendMessageToServer, getBotMessage } from '../api';
import '../App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      message: '',
      messages: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    getBotMessage(msg =>
      this.setState({ ...this.state, messages: [...this.state.messages, msg] })
    );
  }

  handleChange(event) {
    const newMessage = event.target.value;
    this.setState(prevState => ({ ...prevState, message: newMessage }));
  }

  handleSubmit(e) {
    const { message } = this.state;
    e.preventDefault();
    //Send the message to the server
    sendMessageToServer(message);
    this.setState(prevState => ({
      ...prevState,
      message: ''
    }));
  }

  render() {
    return (
      <div>
        <ul className="messages" />
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.message}
            onChange={this.handleChange}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }
}

export default App;
