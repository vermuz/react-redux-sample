export interface GlobalState {
    num: number;
    loadingCount: number;
}

export interface JsonObject {
    amount: number;
}

export class ActionTypes{
    static INCREMENT = 'INCREMENT';
    static DECREMENT = 'DECREMENT';
    static FETCH_REQUEST = 'FETCH_REQUEST';
    static FETCH_SUCCESS = 'FETCH_SUCCESS';
    static FETCH_FAIL = 'FETCH_FAIL';
}