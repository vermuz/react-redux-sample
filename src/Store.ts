import {counter} from './Reducer'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk';

export default createStore(
    counter,
    applyMiddleware(thunk)
);