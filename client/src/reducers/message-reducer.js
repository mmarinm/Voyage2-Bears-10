import { UPDATE_MESSAGE } from '../actions';

const INITIAL_STATE = {
  messages: [
    {
      messageText: 'test1',
      userMessage: true
    },
    {
      messageText: 'test2',
      userMessage: false
    },
    {
      messageText: 'test3',
      userMessage: false
    }
  ]
}

export default function appState(state=INITIAL_STATE, action) {
  switch(action.type) {
    case UPDATE_MESSAGE:
      return (
        Object.assign({}, state, {
          messages: state.messages.concat(action.payload)
        })
      )
    default:
      return state;
  }
}
