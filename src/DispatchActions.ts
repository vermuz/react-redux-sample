import * as axios from "axios";
import {ActionTypes, JsonObject} from "./Models";

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

    public fetchAmount(): Axios.IPromise<any> {
        const failCB = (err:Error) => {
            //console.error(err);
            this.dispatch({ type: ActionTypes.FETCH_FAIL})
        };

        const successCB = (json:Axios.AxiosXHR<JsonObject>) => {
            const action = { type: ActionTypes.FETCH_SUCCESS, amount: json.data.amount};
            this.dispatch(action)
        };

        this.dispatch({ type: ActionTypes.FETCH_REQUEST});
        return axios.get('/api/count')
            .then(successCB)
            .catch(failCB)
    }
}