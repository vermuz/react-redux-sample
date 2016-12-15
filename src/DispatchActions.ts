import 'isomorphic-fetch';
import {ActionTypes, JsonObject} from "./Entities";

export const myHeaders = new Headers({
  "Content-Type": "application/json",
  'Accept': 'application/json',
  'X-Requested-With': 'XMLHttpRequest'
});

export class DispatchActions {
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
    }

    this.dispatch({type: ActionTypes.FETCH_REQUEST});

    return fetch('/api/count', {method: 'GET', headers: myHeaders, credentials: 'include'})
      .then(successCB)
      .catch(failCB)
  }
}