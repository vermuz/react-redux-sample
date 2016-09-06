import {counter} from "../Reducer";
import {GlobalState, ActionTypes} from "../Models";
import {assert} from "chai";

describe('Reducer', () => {
    it('INCREMENT', () => {
        const state: GlobalState = {num: 4, loadingCount:0};
        const action = { type: ActionTypes.INCREMENT, amount: 3};
        const result = counter(state, action);
        assert.deepEqual(result.num, state.num + 3);
        assert.deepEqual(result.loadingCount, state.loadingCount);
    });

    it('DECREMENT', () => {
        const state: GlobalState = {num: -2, loadingCount:0};
        const action = { type: ActionTypes.DECREMENT, amount: 10};
        const result = counter(state, action);
        assert.deepEqual(result.num, state.num - 10);
        assert.deepEqual(result.loadingCount, state.loadingCount);
    });

    it('FETCH_SUCCESS', () => {
        const state: GlobalState = {num: -2, loadingCount:1};
        const action = { type: ActionTypes.FETCH_SUCCESS, amount: 10};
        const result = counter(state, action);
        assert.deepEqual(result.num, state.num + 10);
        assert.deepEqual(result.loadingCount, state.loadingCount -1);
    });
});