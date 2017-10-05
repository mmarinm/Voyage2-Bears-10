import { UPDATE_MESSAGE } from '../actions';

const INITIAL_STATE = {
  messages: ['test1', 'test2', 'test3']
}

export default function appState(state=INITIAL_STATE, action) {
  switch(action.type) {
    case UPDATE_MESSAGE:
      console.log(state);
      return (
        Object.assign({}, state, {
          messages: state.messages.concat(action.payload)
        })
      )
    default:
      return state;
  }
}
