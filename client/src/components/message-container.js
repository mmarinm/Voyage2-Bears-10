import React, { Component } from 'react';
import { connect } from 'react-redux';
import Message from './message';
import { Grid, Row } from 'react-bootstrap';

class MessageContainer extends Component {
  renderMessages = () => {
    return (
      this.props.messagesState.messages.map((data, i) => {
        return (
          <Message
            key={`message_${i}`}
            data={data} />
        );
      })
    )
  }

  render() {
    return (
      <Grid className="MessageContainer">
        {this.props.messagesState ? this.renderMessages():''}
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  messagesState: state.messages
})

export default connect(mapStateToProps, null)(MessageContainer);
