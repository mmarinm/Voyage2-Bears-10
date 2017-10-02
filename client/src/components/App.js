import React, { Component } from 'react';
import { encapsMessage } from '../api';
import '../App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      message: '',
      messages: []
    };
  }

  handleChange(event) {
    this.setState({ message: event.target.value });
  }

  handleSubmit(e) {
    const { message } = this.state;
    e.preventDefault();
    //Send the message to the server
    encapsMessage(message)((err, resp) => {
      console.log(resp);
      this.setState({...this.state, messages: [].push(resp)})
    });
    this.setState({ message: '' });
  }

  render() {
    return (
      <div>
        <ul className="messages" />
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input
            type="text"
            value={this.state.message}
            onChange={this.handleChange.bind(this)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }
}

export default App;
