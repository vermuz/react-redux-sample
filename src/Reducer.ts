import {GlobalState, MyAction, ActionTypes} from "./Entities";

const initialState: GlobalState = {num: 0, loadingCount: 0};

export function counter(state: GlobalState = initialState, action: MyAction): GlobalState {
  //console.log(action.type); //check which action has occurred;
  //console.log(state);
  switch (action.type) {
    case ActionTypes.INCREMENT: {
      const newNum = state.num + action.amount;
      return Object.assign({}, state, {num: newNum});
    }
    case ActionTypes.DECREMENT: {
      const newNum = state.num - action.amount;
      return Object.assign({}, state, {num: newNum});
    }
    case ActionTypes.FETCH_REQUEST: {
      const newCount = state.loadingCount + 1;
      return Object.assign({}, state, {loadingCount: newCount});
    }
    case ActionTypes.FETCH_SUCCESS: {
      const newNum = state.num + action.amount;
      const newCount = state.loadingCount - 1;
      return Object.assign({}, state, {num: newNum, loadingCount: newCount});
    }
    case ActionTypes.FETCH_FAIL: {
      console.error(action.error);
      const newCount = state.loadingCount - 1;
      return Object.assign({}, state, {loadingCount: newCount});
    }
    default:
      return state
  }
}