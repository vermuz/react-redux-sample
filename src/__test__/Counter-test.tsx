import * as React from "react";
import Counter from "../Counter";
import {assert} from "chai";
import {GlobalState} from "../Models";
import * as TestUtils from "react-addons-test-utils";
import * as ReactDOM from "react-dom";

describe('Counter test', () => {

    it('rendering test', () => {
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
});