import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Counter} from "./Counter";
import store from "./Store";
import {DispatchActions} from "./DispatchActions";
import {Provider, connect} from "react-redux";
import {Dispatch} from "redux";

const CounterComponent = connect(
    (store: any) => {return {value: store.counter}},
    (dispatch: Dispatch<any>) => {return {actions: new DispatchActions(dispatch)}}
)(Counter);

ReactDOM.render(
    <Provider store={store}>
        <CounterComponent />
    </Provider>
    , document.getElementById('app')
);