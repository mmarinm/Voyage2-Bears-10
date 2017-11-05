import { combineReducers } from 'redux';
import messageReducer from './message-reducer';

let rootReducer = combineReducers({
  messages: messageReducer
});

export default rootReducer;
