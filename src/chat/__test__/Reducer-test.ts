import {assert} from "chai";
import {chat} from "../Reducer";
import {ChatState, MyAction, ActionTypes, ChatMessage} from "../Models";
import {List} from "immutable";

describe('reducer test', () => {
    it('CREATE_WEBSOCKET', () => {
        const ws: any = "dummy";
        const chatState:ChatState = {messages: List.of<ChatMessage>(), ws: null};
        const action: MyAction = { type: ActionTypes.CREATE_WEBSOCKET, ws: ws};
        const result = chat(chatState, action);
        assert.deepEqual(result.ws, ws);
    });
});