import * as React from "react";
import TodoList from "../TodoList";
import {spy} from "sinon";
import {assert} from "chai";
import {Todo} from "../Models";
import {List} from "immutable";
import {renderWithMui} from "../../__test__/TestUtil";
import {DispatchActions} from "../Models";
import * as ReactDOM from "react-dom";

describe('TodoList test', () => {

    it('rendering test, it has div tag', () => {
        const spyCB:any = spy();
        //this actions will catch all event, at componentDidMount.
        const actions:any = new DispatchActions(spyCB);
        const todos: List<Todo> = List.of<Todo>();
        const component: any = renderWithMui(<TodoList todos={todos} actions={actions} />);

        const dom = ReactDOM.findDOMNode(component);
        const inputs: NodeListOf<HTMLDivElement> = dom.getElementsByTagName("div");
        const input: HTMLDivElement = inputs[0];
        assert.notEqual(input, null);
    });

    it('when render component, it will call fetchAll()', () => {
        const spyCB:any = spy();
        const actions:any = {fetchAll: spyCB};
        const todos: List<Todo> = List.of<Todo>();
        const component: any = renderWithMui(<TodoList todos={todos} actions={actions} />);
        assert.deepEqual(spyCB.calledOnce, true);
    });
});