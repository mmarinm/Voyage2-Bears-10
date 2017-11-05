import React, { Component } from 'react';
import { connect } from 'react-redux';
import Message from './message';
import { Grid } from 'react-bootstrap';

class MessageContainer extends Component {
  renderMessages = () => {
    return this.props.messagesState.messages.map((data, i) => {
      return <Message key={`message_${i}`} data={data} />;
    });
  };

  componentDidUpdate(currentProps, currentState) {
    window.scrollTo(0, document.body.clientHeight);
  }

  render() {
    return (
      <Grid className="MessageContainer">
        {this.props.messagesState ? this.renderMessages() : ''}
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  messagesState: state.messages
});

export default connect(mapStateToProps, null)(MessageContainer);
