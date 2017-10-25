import { createStore } from 'redux';
import rootReducer from './reducers';

<<<<<<< HEAD
let store = createStore(rootReducer, {});
=======
const store = createStore(
  rootReducer,
  {},
  window.devToolsExtension ? window.devToolsExtension() : f => f
);
>>>>>>> 73b6a4f1ac61c3da4c2f8fd44df7a1ebee85fff6

export default store;
