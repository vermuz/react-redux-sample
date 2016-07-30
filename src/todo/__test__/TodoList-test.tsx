import * as React from "react";
import TodoList from "../TodoList";
import {spy} from "sinon";
import {assert} from "chai";
import {Todo, TodoState} from "../Models";
import * as TestUtils from "react-addons-test-utils";
import {List, Map} from "immutable";

describe('TodoList test', () => {

    it('rendering test: it will call fetchAll()', () => {
        const spyCB:any = spy();
        const actions:any = {fetchAll: spyCB};
        const state: TodoState = {todos: List.of<Todo>(), marks: Map.of<boolean, string>()};
        const counterComponent: any = TestUtils.renderIntoDocument(
            <TodoList state={state} actions={actions} />
        );
        assert.deepEqual(spyCB.calledOnce, true);
    });
});