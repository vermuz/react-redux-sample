import 'isomorphic-fetch';

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
}

export class ActionTypes{
  static INCREMENT = 'counter/increment';
  static DECREMENT = 'counter/decrement';
  static FETCH_REQUEST_START = 'counter/fetch_request_start';
  static FETCH_REQUEST_FINISH = 'counter/fetch_request_finish';
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
    case ActionTypes.FETCH_REQUEST_START: {
      const newCount = state.loadingCount + 1;
      return Object.assign({}, state, {loadingCount: newCount});
    }
    case ActionTypes.FETCH_REQUEST_FINISH: {
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

  public async fetchAmount(): Promise<void> {
    this.dispatch({type: ActionTypes.FETCH_REQUEST_START});

    try {
      const response: IResponse = await fetch('/api/count', {
        method: 'GET',
        headers: myHeaders,
        credentials: 'include'
      });

      if (response.status === 200) { //2xx
        const json = await response.json<JsonObject>();
        this.dispatch({type: ActionTypes.FETCH_REQUEST_FINISH});
        this.dispatch({type: ActionTypes.INCREMENT, amount: json.amount})
      } else {
        throw new Error(`illegal status code: ${response.status}`);
      }
    } catch(err/* :Error*/) {
      console.error(err);
      this.dispatch({type: ActionTypes.FETCH_REQUEST_FINISH})
    }
  }
}