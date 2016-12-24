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

const INCREMENT = 'counter/increment';
const DECREMENT = 'counter/decrement';
const FETCH_REQUEST = 'counter/fetch_request';
const FETCH_SUCCESS = 'counter/fetch_success';
const FETCH_FAIL = 'counter/fetch_fail';

const initialState:CounterState = {num: 0, loadingCount: 0};

export default function reducer(state: CounterState = initialState, action: MyAction): CounterState {
  switch (action.type) {
    case INCREMENT: {
      const newNum = state.num + action.amount;
      return Object.assign({}, state, {num: newNum});
    }
    case DECREMENT: {
      const newNum = state.num - action.amount;
      return Object.assign({}, state, {num: newNum});
    }
    case FETCH_REQUEST: {
      const newCount = state.loadingCount + 1;
      return Object.assign({}, state, {loadingCount: newCount});
    }
    case FETCH_SUCCESS: {
      const newNum = state.num + action.amount;
      const newCount = state.loadingCount - 1;
      return Object.assign({}, state, {num: newNum, loadingCount: newCount});
    }
    case FETCH_FAIL: {
      console.error(action.error);
      const newCount = state.loadingCount - 1;
      return Object.assign({}, state, {loadingCount: newCount});
    }
    default:
      return state
  }
}

export function increment(dispatch: Dispatch<any>, amount: number) {
  dispatch({ type: INCREMENT, amount: amount})
}

export function decrement(dispatch: Dispatch<any>, amount: number) {
  dispatch({ type: DECREMENT, amount: amount})
}

export function fetchAmount(dispatch: Dispatch<any>): Promise<void> {
  const failCB = (err: Error) => {
    console.error(err);
    dispatch({type: FETCH_FAIL, error: err})
  };

  const successCB:(response: IResponse) => Promise<void> = (response) => {

    if(response.status === 200){ //2xx
      return response.json<JsonObject>().then((json) => {
        const action = {type: FETCH_SUCCESS, amount: json.amount};
        dispatch(action)
      });
    }else{
      dispatch({type: FETCH_FAIL, error: response.status})
    }
  };

  dispatch({type: FETCH_REQUEST});

  return fetch('/api/count', {method: 'GET', headers: myHeaders, credentials: 'include'})
    .then(successCB)
    .catch(failCB)
}