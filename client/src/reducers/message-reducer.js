import { USER_MESSAGE, BOT_MESSAGE } from '../actions';

const INITIAL_STATE = {
  messages: [
    {
      messageText: 'Hey!',
      timestamp: new Date(),
      isUserMessage: false
    },
    {
      messageText: 'Ask me to do stuff!',
      timestamp: new Date(),
      isUserMessage: false
    },
  ]
}

export default function messageReducer(state=INITIAL_STATE, action) {
  switch(action.type) {
    case USER_MESSAGE:
    case BOT_MESSAGE:
      return { ...state, messages: [...state.messages, action.payload] }
    default:
      return state;
  }
}
