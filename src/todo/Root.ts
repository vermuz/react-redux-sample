import * as React from 'react';
import {connect} from "react-redux";
import {DispatchActions} from "./Models";
import {Dispatch} from "redux";
import TodoListRoot from "./TodoListRoot";

export default connect(
    (state: any) => {return {state: state.todoReduce}},
    (dispatch: Dispatch) => {return {actions: new DispatchActions(dispatch)}}
)(TodoListRoot);
