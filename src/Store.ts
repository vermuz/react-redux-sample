import {counter} from "./counter/Reducer";
import {todoReduce} from "./todo/Reducer";
import {createStore, applyMiddleware, combineReducers} from "redux";
import thunk from "redux-thunk";

export default createStore(
    combineReducers({
        counter,
        todoReduce
    }),
    applyMiddleware(thunk)
);
