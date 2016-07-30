import {assert} from "chai";
import * as ReduxMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {fetchAllAction} from "../ActionCreators";
import {ActionTypes, Todo} from "../Models";
import * as nock from "nock";
import {List} from "immutable";

describe('Async test', () => {
    const reduxMockStore:any = ReduxMockStore;

    it('nock success test',  (done: MochaDone) => {
        //use mock server.
        
        nock('http://localhost/')
            .get('/api/todos/all')
            .reply(200, [{id: 1, text:"task", isComplete: true}]);

        const middlewares = [thunk];
        const mockStore = reduxMockStore(middlewares);

        const state = {};
        const store = mockStore(state);
        const todos = List.of<Todo>(new Todo(1, "task", true));
        store.dispatch(fetchAllAction()).then(() => {
            const actions = store.getActions();
            assert.deepEqual(actions[0], { type: ActionTypes.FETCH_REQUEST });
            assert.deepEqual(actions[1], { type: ActionTypes.FETCH_ALL, todos: todos});
            done();
        }).catch(done);
    });

    it('nock fail test',  (done: MochaDone) => {
        //no mock server, so request must be fail.

        const middlewares = [thunk];
        const mockStore = reduxMockStore(middlewares);

        const state = {};
        const store = mockStore(state);
        store.dispatch(fetchAllAction()).then(() => {
            const actions = store.getActions();
            assert.deepEqual(actions[0], { type: ActionTypes.FETCH_REQUEST });
            assert.deepEqual(actions[1], { type: ActionTypes.FETCH_FAIL});
            done();
        }).catch(done);
    });
});