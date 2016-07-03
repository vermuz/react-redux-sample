import {MyAction, ActionTypes, ChatMessage, JsonObject} from "./Models";

export function sendMessage(ws: WebSocket, msg: string) {
    return (dispatch: (action: MyAction) => any) => {
        ws.send(msg);
    }
}

export function closeWS(ws: WebSocket) {
    return (dispatch:(action:MyAction) => any) => {
        ws.close();
    }
}

export function createWS(name: string) {
    return (dispatch: (action: MyAction) => any) => {

        if (WebSocket == undefined) {
            alert('This browser is not support WebSocket.');
            return
        }
        const ws = new WebSocket("ws://localhost:3000/chat?name=" + name);

        ws.onopen = ((e: Event) => {
            console.log("connected");
        });

        ws.onmessage = ((e: MessageEvent) => {
            const json: JsonObject = JSON.parse(e.data);
            const msg: ChatMessage = new ChatMessage(json.id, json.user, json.message);
            dispatch({type: ActionTypes.RECEIVE_MESSAGE, message: msg});
        });

        ws.onclose = ((e: CloseEvent) => {
            console.log("disconnected");
        });

        dispatch({type: ActionTypes.CREATE_WEBSOCKET, ws: ws});
    }
}
