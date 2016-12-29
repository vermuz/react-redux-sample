import * as React from "react";
import {Counter} from "../Counter";
import {shallow} from "enzyme";
import {CounterState} from "../module";

describe('Counter', () => {

  it('rendering', () => {
    const actions:any = {};
    const state: CounterState = {num: 1, loadingCount: 1};
    const wrapper = shallow(<Counter value={state} actions={actions} />);
    expect(wrapper.find('p').at(0).prop('children')).toBe('loading');
    expect(wrapper.find('p').at(1).prop('children')).toBe('score: 1');
  });

  it('click', () => {
    const actionSpy:any = {fetchAmount: null};
    spyOn(actionSpy, 'fetchAmount');
    const state: CounterState = {num: 0, loadingCount: 0};
    const wrapper = shallow(<Counter value={state} actions={actionSpy} />);
    wrapper.find('button').at(2).simulate('click');
    expect(actionSpy.fetchAmount).toHaveBeenCalledWith();
  });
});