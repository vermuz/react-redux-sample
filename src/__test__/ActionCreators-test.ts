import thunk from "redux-thunk";
import {fetchAmountAction} from "../ActionCreators";
import {ActionTypes} from "../Models";
const configureStore = require("redux-mock-store");
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

describe('Async test', () => {

    it('nock success test',  () => {
        const mock = new MockAdapter(axios);
        mock.onGet('/api/count').reply(200, { amount: 100 });

        const middlewares = [thunk];
        const mockStore = configureStore(middlewares);

        const state = {};
        const store = mockStore(state);
        return store.dispatch(fetchAmountAction()).then(() => {
            const actions = store.getActions();
            expect(actions[0]).toBe({ type: ActionTypes.FETCH_REQUEST });
            expect(actions[1]).toBe({ type: ActionTypes.FETCH_SUCCESS, amount: 100 });
            mock.restore();
        });
    });

    it('nock fail test',  () => {
        const mock = new MockAdapter(axios);
        mock.onGet('/api/count').reply(400, {});

        const middlewares = [thunk];
        const mockStore = configureStore(middlewares);

        const state = {};
        const store = mockStore(state);
        return store.dispatch(fetchAmountAction()).then(() => {
            const actions = store.getActions();
            expect(actions[0]).toBe({ type: ActionTypes.FETCH_REQUEST });
            expect(actions[1].type).toBe(ActionTypes.FETCH_FAIL);
            mock.restore();
        });
    });
});