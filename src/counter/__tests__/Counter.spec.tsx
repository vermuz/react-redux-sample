import * as React from "react";
import {Counter} from "../Counter";
import * as TestUtils from "react-addons-test-utils";
import * as ReactDOM from "react-dom";
import {CounterState} from "../module";

describe('Counter', () => {

  it('rendering', () => {
    const actions:any = {};
    const state: CounterState = {num: 1, loadingCount: 1};
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

  it('click', () => {
    const spy:any = {fetchAmount: null};
    spyOn(spy, 'fetchAmount');
    const state: CounterState = {num: 0, loadingCount: 0};
    const counterComponent: any = TestUtils.renderIntoDocument(
      <Counter value={state} actions={spy} />
    );

    const counterDOM = ReactDOM.findDOMNode(counterComponent);
    const buttons: NodeListOf<HTMLButtonElement> = counterDOM.getElementsByTagName("button");
    const button: HTMLButtonElement = buttons[2];

    TestUtils.Simulate.click(button);
    expect(spy.fetchAmount).toHaveBeenCalledWith();
  });
});