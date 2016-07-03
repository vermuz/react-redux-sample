import React = require('react');
import {TodoState, DispatchActions} from "./Models";
import TodoList from "./TodoList";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

interface Props {
    state: TodoState;
    actions: DispatchActions;
}

export default class TodoListRoot extends React.Component<Props, {}> {

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
            <div>
                <h2>TODO List</h2>
                <TodoList todos={this.props.state.todos} actions={this.props.actions}/>
            </div>
                </MuiThemeProvider>
        )
    }
}
