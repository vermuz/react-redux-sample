import {ChatState, MyAction, ActionTypes, ChatMessage} from "./Models";
import {List} from "immutable";
const objectAssign = require('object-assign');

const initialState:ChatState = {messages: List.of<ChatMessage>()};

export function chat(state: ChatState = initialState, action: MyAction): ChatState {
    //console.log(action.type); //check which action has occurred;
    switch (action.type) {
        case ActionTypes.SEND_MESSAGE:
            return state;
        case ActionTypes.RECEIVE_MESSAGE:
            const msgs = state.messages.push(action.message);
            return objectAssign({}, state, {messages: msgs});
        case ActionTypes.CREATE_WEBSOCKET:
            return objectAssign({}, state, {ws: action.ws});
        default:
            return state
    }
}