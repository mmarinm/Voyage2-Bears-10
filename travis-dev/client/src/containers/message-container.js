import React, { Component } from 'react';
import { connect } from 'react-redux';
import Message from '../components/message';
import { Grid, Row } from 'react-bootstrap';

class MessageContainer extends Component {
  renderMessages = () => {
    return (
      this.props.appState.messages.map((data, i) => {
        return (
          <Message
            key={`message_${i}`}
            data={data} />
        );
      })
    )
  }

  render() {
    console.log("TEST" + this.props.messages);
    return (
      <Grid>
        <Row>{this.props.appState ? this.renderMessages():''}</Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  appState: state.messages
})

export default connect(mapStateToProps, null)(MessageContainer);
