import * as request from 'superagent';
import {ActionTypes, JsonObject} from "./Entities";
import {Response} from "superagent";

export class DispatchActions {
    private dispatch: (action: any) => any;
    constructor(dispatch: (action: any) => any){
        this.dispatch = dispatch
    }

    public increment(amount: number) {
        this.dispatch({ type: ActionTypes.INCREMENT, amount: amount})
    }

    public decrement(amount: number) {
        this.dispatch({ type: ActionTypes.DECREMENT, amount: amount})
    }

    public fetchAmount(): Promise<void> {
        const failCB = (err:Error) => {
            console.error(err);
            this.dispatch({ type: ActionTypes.FETCH_FAIL})
        };

        const successCB = (res:Response) => {
            const json:JsonObject = res.body;
            const action = { type: ActionTypes.FETCH_SUCCESS, amount: json.amount};
            this.dispatch(action)
        };

        this.dispatch({ type: ActionTypes.FETCH_REQUEST});

        return request
            .get('/api/count')
            .set('Accept', 'application/json')
            .then(successCB)
            .catch(failCB);
    }
}