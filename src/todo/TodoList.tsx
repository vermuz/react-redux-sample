import * as React from "react";
import {DispatchActions, TodoState, Todo} from "./Models";
import Footer from "./Footer";
import TodoItem from "./TodoItem";

interface Props {
    state: TodoState;
    actions: DispatchActions;
}

export default class TodoList extends React.Component<Props, {}> {
    
    componentDidMount() {
        //if todos are already taken, don't action anymore.
        if(!this.props.state.todos.isEmpty()) return;
        this.props.actions.fetchAll()
    }

    render() {
        const todoItems = this.props.state.todos.map((item:Todo) => (
            <TodoItem key={item.id} item={item} marks={this.props.state.marks} actions={this.props.actions} />
        ));
        return (
            <div>
                {todoItems}
                <Footer actions={this.props.actions} />
            </div>
        )
    }
}