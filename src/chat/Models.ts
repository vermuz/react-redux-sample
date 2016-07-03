import {sendMessage, createWS, closeWS} from "./ActionCreators";
import {List} from "immutable";

export interface ChatState {
    messages: List<ChatMessage>;
    ws?: WebSocket;
}

export interface JsonObject {
    id: number;
    user: string;
    message: string;
}

export class ChatMessage implements JsonObject{
    constructor(public id: number, public user: string, public message: string){}
}

export interface MyAction {
    type: string;
    message?: ChatMessage;
    ws?: WebSocket;
}

export class DispatchActions {
    constructor(private dispatch: (action: any) => any){
    }

    public createWS(name: string) {
        this.dispatch(createWS(name))
    }

    public closeWS(ws: WebSocket) {
        this.dispatch(closeWS(ws))
    }

    public sendMessage(msg: string, ws: WebSocket) {
        this.dispatch(sendMessage(ws, msg))
    }
}

export class ActionTypes{
    static CREATE_WEBSOCKET = 'CHAT_CREATE_WEBSOCKET';
    static SEND_MESSAGE = 'CHAT_COUNTER_INCREMENT';
    static RECEIVE_MESSAGE = 'CHAT_COUNTER_DECREMENT';
}
