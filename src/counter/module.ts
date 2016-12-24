import 'isomorphic-fetch';
import {Dispatch} from "redux";

export const myHeaders = new Headers({
  "Content-Type": "application/json",
  'Accept': 'application/json',
  'X-Requested-With': 'XMLHttpRequest'
});

interface JsonObject {
  amount: number;
}

export interface CounterState {
  num: number;
  loadingCount: number;
}

interface MyAction {
  type: string;
  amount?: number;
  error?: Error;
}

export class ActionTypes{
  static INCREMENT = 'counter/increment';
  static DECREMENT = 'counter/decrement';
  static FETCH_REQUEST = 'counter/fetch_request';
  static FETCH_SUCCESS = 'counter/fetch_success';
  static FETCH_FAIL = 'counter/fetch_fail';
}

const initialState:CounterState = {num: 0, loadingCount: 0};

export default function reducer(state: CounterState = initialState, action: MyAction): CounterState {
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

export class ActionDispatcher {
  private dispatch: (action: any) => any;

  constructor(dispatch: (action: any) => any) {
    this.dispatch = dispatch
  }

  public increment(amount: number) {
    this.dispatch({type: ActionTypes.INCREMENT, amount: amount})
  }

  public decrement(amount: number) {
    this.dispatch({type: ActionTypes.DECREMENT, amount: amount})
  }

  public fetchAmount(): Promise<void> {
    const failCB = (err: Error) => {
      console.error(err);
      this.dispatch({type: ActionTypes.FETCH_FAIL, error: err})
    };

    const successCB: (response: IResponse) => Promise<void> = (response) => {

      if (response.status === 200) { //2xx
        return response.json<JsonObject>().then((json) => {
          const action = {type: ActionTypes.FETCH_SUCCESS, amount: json.amount};
          this.dispatch(action)
        });
      } else {
        this.dispatch({type: ActionTypes.FETCH_FAIL, error: response.status})
      }
    };

    this.dispatch({type: ActionTypes.FETCH_REQUEST});

    return fetch('/api/count', {method: 'GET', headers: myHeaders, credentials: 'include'})
      .then(successCB)
      .catch(failCB)
  }
}