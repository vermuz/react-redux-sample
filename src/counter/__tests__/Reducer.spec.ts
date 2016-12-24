import reducer from "../module";
import {CounterState, ActionTypes} from "../module";

describe('Reducer', () => {
  it('INCREMENT', () => {
    const state: CounterState = {num: 4, loadingCount:0};
    const action = { type: ActionTypes.INCREMENT, amount: 3};
    const result = reducer(state, action);
    expect(result.num).toBe(state.num + 3);
    expect(result.loadingCount).toBe(state.loadingCount);
  });

  it('DECREMENT', () => {
    const state: CounterState = {num: -2, loadingCount:0};
    const action = { type: ActionTypes.DECREMENT, amount: 10};
    const result = reducer(state, action);
    expect(result.num).toBe(state.num - 10);
    expect(result.loadingCount).toBe(state.loadingCount);
  });

  it('FETCH_SUCCESS', () => {
    const state: CounterState = {num: -2, loadingCount:1};
    const action = { type: ActionTypes.FETCH_SUCCESS, amount: 10};
    const result = reducer(state, action);
    expect(result.num).toBe(state.num + 10);
    expect(result.loadingCount).toBe(state.loadingCount - 1);
  });
});