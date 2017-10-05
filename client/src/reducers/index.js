import { combineReducers } from 'redux';
import appState from './message-reducer';

let rootReducer = combineReducers({
  messages: appState
});

export default rootReducer;
