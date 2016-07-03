import * as React from 'react';
import {connect} from "react-redux";
import {DispatchActions} from "./Models";
import {Dispatch} from "redux";
import ChatRoot from "./ChatRoot";

export default connect(
    (state: any) => {return {state: state.chat}},
    (dispatch: Dispatch) => {return {actions: new DispatchActions(dispatch)}}
)(ChatRoot);