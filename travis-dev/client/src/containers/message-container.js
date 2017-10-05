import React, { Component } from 'react';
import { connect } from 'react-redux';
import Message from '../components/message';

class MessageContainer extends Component {
  renderMessages = () => {
    return (
      this.props.messages.messages.map((message, i) => {
        return (
          <Message
            key={`message_${i}`}
            message={message} />
        );
      })
    )
  }

  render() {
    console.log("TEST" + this.props.messages);
    return (
      <ul>
        {this.props.messages ? this.renderMessages():''}
      </ul>
    );
  }
}

const mapStateToProps = state => ({
  messages: state.messages
})

export default connect(mapStateToProps, null)(MessageContainer);
