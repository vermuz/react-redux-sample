import {CounterState, MyAction, ActionTypes} from "./Models";
import objectAssign = require('object-assign');

const initialState:CounterState = {num: 0, loadingCount: 0};

export function counter(state: CounterState = initialState, action: MyAction): CounterState {
    //console.log(action.type); //check which action has occurred;
    //console.log(state);
    switch (action.type) {
        case ActionTypes.LOGIN: {
            const newNum = state.num + action.amount;
            return objectAssign({}, state, {num: newNum});
        }
        default:
            return state
    }
}