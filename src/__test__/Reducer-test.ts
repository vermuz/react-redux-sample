import {counter} from "../Reducer";
import {GlobalState, MyAction, ActionTypes} from "../Models";

describe('reducer test', () => {
    it('INCREMENT', () => {
        const state: GlobalState = {num: 4, loadingCount:0};
        const action: MyAction = { type: ActionTypes.INCREMENT, amount: 3};
        const result = counter(state, action);
        expect(result.num).toBe(state.num + 3);
        expect(result.loadingCount).toBe(state.loadingCount);
    });

    it('DECREMENT', () => {
        const state: GlobalState = {num: -2, loadingCount:0};
        const action: MyAction = { type: ActionTypes.DECREMENT, amount: 10};
        const result = counter(state, action);
        expect(result.num).toBe(state.num - 10);
        expect(result.loadingCount).toBe(state.loadingCount);
    });

    it('FETCH_SUCCESS', () => {
        const state: GlobalState = {num: -2, loadingCount:1};
        const action: MyAction = { type: ActionTypes.FETCH_SUCCESS, amount: 10};
        const result = counter(state, action);
        expect(result.num).toBe(state.num + 10);
        expect(result.loadingCount).toBe(state.loadingCount - 1);
    });
});