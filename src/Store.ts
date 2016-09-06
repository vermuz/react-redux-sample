import {counter} from './Reducer'
import { createStore, applyMiddleware } from 'redux'

export default createStore(
    counter,
    applyMiddleware()
);
