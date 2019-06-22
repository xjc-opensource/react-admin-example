import {createStore, combineReducers, applyMiddleware} from 'redux';
import * as counter from './counter/reducer';
import thunk from 'redux-thunk';

let store = createStore(
    combineReducers({...counter}),
    applyMiddleware(thunk)
);

export default store;