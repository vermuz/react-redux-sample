import * as React from "react";
import {Counter} from "../Counter";
import {GlobalState} from "../Models";
import * as TestUtils from "react-addons-test-utils";
import * as ReactDOM from "react-dom";
import {assert} from "chai";
import {spy} from "sinon";

describe('Counter', () => {

    it('rendering', () => {
        const actions:any = {};
        const state: GlobalState = {num: 1, loadingCount: 1};
        const counterComponent: any = TestUtils.renderIntoDocument(
            <Counter value={state} actions={actions} />
        );

        const counterDOM = ReactDOM.findDOMNode(counterComponent);
        const ps: NodeListOf<HTMLParagraphElement> = counterDOM.getElementsByTagName("p");

        const p0: HTMLParagraphElement = ps[0];
        assert.deepEqual(p0.textContent, "loading");

        const p1: HTMLParagraphElement = ps[1];
        assert.deepEqual(p1.textContent, "score: 1");
    });

    it('click', () => {
        const spyCB:any = spy();
        const actions:any = {fetchAmount: spyCB};
        const state: GlobalState = {num: 0, loadingCount: 0};
        const counterComponent: any = TestUtils.renderIntoDocument(
            <Counter value={state} actions={actions} />
        );

        const counterDOM = ReactDOM.findDOMNode(counterComponent);
        const buttons: NodeListOf<HTMLButtonElement> = counterDOM.getElementsByTagName("button");
        const button: HTMLButtonElement = buttons[2];

        TestUtils.Simulate.click(button);
        assert(spyCB.calledOnce);
        assert(spyCB.calledWith());
    });
});