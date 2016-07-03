import {counter} from "./counter/Reducer";
import {todoReduce} from "./todo/Reducer";
import {createStore, applyMiddleware, combineReducers} from "redux";
import thunk from "redux-thunk";
import {chat} from "./chat/Reducer";

export default createStore(
    combineReducers({
        counter,
        todoReduce,
        chat
    }),
    applyMiddleware(thunk)
);
