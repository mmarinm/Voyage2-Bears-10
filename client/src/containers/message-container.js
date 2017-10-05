import React, { Component } from 'react';
import { connect } from 'react-redux';
import Message from '../components/message';
import { Grid, Row } from 'react-bootstrap';

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
      <Grid>
        <Row>{this.props.messages ? this.renderMessages():''}</Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  messages: state.messages
})

export default connect(mapStateToProps, null)(MessageContainer);
