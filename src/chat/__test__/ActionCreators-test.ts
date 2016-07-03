import {assert} from "chai";
import * as ReduxMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {createWS, sendMessage} from "../ActionCreators";
import {ActionTypes} from "../Models";
const Server = require('mock-socket').Server;
import {spy} from "sinon";
import {JsonObject} from "../Models";

describe('ActionCreators test', () => {
    const reduxMockStore:any = ReduxMockStore;

    it('createWS', (done: MochaDone) => {

        const middlewares = [thunk];
        const mockStore = reduxMockStore(middlewares);
        const state = {};
        const store = mockStore(state);

        const name = "test-name";
        const json: JsonObject = {id: 1, user: "aa", message: "mm"};
        
        const mockServer = new Server('ws://localhost:3000/chat?name=' + name);
        mockServer.on('connection', (server:any) => {
            mockServer.send(JSON.stringify(json));
        });
        
        store.dispatch(createWS(name));

        setTimeout(() => {
            const actions = store.getActions();
            assert.deepEqual(actions.length, 2);
            
            assert.deepEqual(actions[0].type, ActionTypes.CREATE_WEBSOCKET);
            assert.deepEqual(actions[0].ws.url, "ws://localhost:3000/chat?name=" + name);

            assert.deepEqual(actions[1].type, ActionTypes.RECEIVE_MESSAGE);
            assert.deepEqual(actions[1].message, json);
            mockServer.stop();
            done();
        }, 100);
    });

    it('sendMessage', () => {
        const middlewares = [thunk];
        const mockStore = reduxMockStore(middlewares);
        const state = {};
        const store = mockStore(state);

        const spyCB:any = spy();

        const ws:any = {send: spyCB};
        store.dispatch(sendMessage(ws, "test-message"));
        
        assert.deepEqual(spyCB.calledOnce, true);
        assert.deepEqual(spyCB.calledWith("test-message"), true);
    });

});