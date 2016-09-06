import * as React from "react";
import {Counter} from "../Counter";
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
        expect(p0.textContent).toBe("loading");

        const p1: HTMLParagraphElement = ps[1];
        expect(p1.textContent).toBe("score: 1");
    });
});