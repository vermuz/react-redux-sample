import fetchMock from 'fetch-mock';
import {ActionTypes, ActionDispatcher} from "../module";


describe('DispatchActions', () => {

  beforeEach(() => {
    fetchMock.restore();
  });

  it('increment', () => {
    const spy: any = {dispatch: null};
    spyOn(spy, 'dispatch');
    const actions = new ActionDispatcher(spy.dispatch);
    actions.increment(100);
    expect(spy.dispatch).toHaveBeenCalledWith({type: ActionTypes.INCREMENT, amount: 100});
  });

  it('fetchAmount success', async (done) => {
    fetchMock.get('/api/count', {body: {amount: 100}, status: 200});

    const spy: any = {dispatch: null};
    spyOn(spy, 'dispatch');
    const actions = new ActionDispatcher(spy.dispatch);
    await actions.fetchAmount();
    expect(spy.dispatch.calls.argsFor(0)[0]).toEqual({type: ActionTypes.FETCH_REQUEST_START});
    expect(spy.dispatch.calls.argsFor(1)[0]).toEqual({type: ActionTypes.INCREMENT, amount: 100});
    expect(spy.dispatch.calls.argsFor(2)[0]).toEqual({type: ActionTypes.FETCH_REQUEST_FINISH});
    done();
  });

  it('fetchAmount fail', async (done) => {
    fetchMock.get('/api/count', {body: {}, status: 400});

    const spy: any = {dispatch: null};
    spyOn(spy, 'dispatch');
    const actions = new ActionDispatcher(spy.dispatch);
    await actions.fetchAmount();
    expect(spy.dispatch.calls.argsFor(0)[0]).toEqual({type: ActionTypes.FETCH_REQUEST_START});
    expect(spy.dispatch.calls.argsFor(1)[0]).toEqual({type: ActionTypes.FETCH_REQUEST_FINISH});
    done();
  });
});