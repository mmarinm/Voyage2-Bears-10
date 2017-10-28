import { UPDATE_MESSAGE, BOT_MESSAGE } from '../actions';

const INITIAL_STATE = {
  messages: [
    {
      messageText: 'Hey!',
      timestamp: new Date(),
      isUserMessage: false
    },
    {
      messageText: 'Ask me about the time!',
      timestamp: new Date(),
      isUserMessage: false
    }
  ]
};

export default function messageReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_MESSAGE:
    case BOT_MESSAGE:
      return { ...state, messages: [...state.messages, action.payload] };
    default:
      return state;
  }
}
