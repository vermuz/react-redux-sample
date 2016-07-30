import * as React from "react";
import {Todo, DispatchActions} from "./Models";
import {Map} from "immutable";

export interface Props {
    item: Todo;
    key?: number; // I think this prop is unnecessary, but unless it an error occurs in tsc.
    actions: DispatchActions;
    marks: Map<boolean, string>
}

export default class TodoItem extends React.Component<Props, {}> {
    constructor () {
        super();
    }

    removeItem () {
        this.props.actions.deleteTodo(this.props.item.id);
    }

    changeItemStatus () {
        this.props.actions.changeTodoStatus(this.props.item.id);
    }

    render () {
        return (
            <li>
                <span>{this.props.marks.get(this.props.item.isComplete)}:  {this.props.item.text} </span>
                <button
                    className="myButton"
                    onClick={this.removeItem.bind(this)}
                    children="delete" />
                <button
                    className="myButton"
                    onClick={this.changeItemStatus.bind(this)}
                    children={this.props.item.isComplete ? "Yet" : "Done"} />
            </li>
        );
    }
}