import * as React from "react";
import {connect} from "react-redux";
import {DispatchActions} from "./Models";
import {Dispatch} from "redux";
import TodoList from "./TodoList";

export default connect(
    (state: any) => {return {state: state.todoReduce}},
    (dispatch: Dispatch<any>) => {return {actions: new DispatchActions(dispatch)}}
)(TodoList);