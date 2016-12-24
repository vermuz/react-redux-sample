//polyfills
import 'core-js'

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Counter} from "./counter/Root";
import store from "./Store";
import {Provider, connect} from "react-redux";
import {Dispatch} from "redux";

const CounterComponent = connect(
  (store: any) => ({value: store.counter}),
  (dispatch: Dispatch<any>) => ({dispatch: dispatch})
)(Counter);

ReactDOM.render(
  <Provider store={store}>
    <CounterComponent />
  </Provider>
  , document.getElementById('app')
);