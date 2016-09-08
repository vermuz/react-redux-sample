import {counter} from './Reducer'
import { createStore, combineReducers } from 'redux'

export default createStore(
    combineReducers({
        counter
    })
);