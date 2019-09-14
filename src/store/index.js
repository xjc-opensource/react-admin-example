import {createStore, combineReducers, applyMiddleware} from 'redux';
import * as counter from './counter/reducer';
import * as user from './user/reducer';
import thunk from 'redux-thunk';

let store = createStore(
    combineReducers({...counter, ...user}),
    applyMiddleware(thunk)
);

export default store;