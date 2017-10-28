import React, { Component } from 'react';
import { connect } from 'react-redux';
import Message from '../components/message';
import { Grid, Row } from 'react-bootstrap';

class MessageContainer extends Component {
  renderMessages = () => {
    return this.props.appState.messages.map((data, i) => {
      return <Message key={`message_${i}`} data={data} />;
    });
  };

  // Force window to scroll down if there is a long conversation history.
  componentDidUpdate(currentProps, currentState) {
    window.scrollTo(0, document.body.clientHeight);
  }

  render() {
    console.log('TEST' + this.props.messages);
    return (
      <Grid className="MessageContainer">
        {this.props.appState ? this.renderMessages() : ''}
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  appState: state.messages
});

export default connect(mapStateToProps, null)(MessageContainer);
