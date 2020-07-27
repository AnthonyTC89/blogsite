import { createStore, combineReducers } from 'redux';
import session from './reducers/session';
import navbar from './reducers/navbar';

const reducer = combineReducers({
  session,
  navbar,
});

const store = createStore(reducer);

export default store;
