import {ActionTypes} from "../Models";
import {DispatchActions} from "../DispatchActions";
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

describe('DispatchActions', () => {

    let mock: any;

    beforeEach(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.restore();
    });

    it('increment',  () => {
        const spy:any = {dispatch: null};
        spyOn(spy, 'dispatch');
        const actions = new DispatchActions(spy.dispatch);
        actions.increment(100);
        expect(spy.dispatch).toHaveBeenCalledWith({ type: ActionTypes.INCREMENT, amount: 100});
    });

    it('fetchAmount success',  () => {

        mock.onGet('/api/count').reply(200, { amount: 100 });

        const spy:any = {dispatch: null};
        spyOn(spy, 'dispatch');
        const actions = new DispatchActions(spy.dispatch);
        return actions.fetchAmount().then(() => {
            expect(spy.dispatch.calls.argsFor(0)).toEqual({ type: ActionTypes.FETCH_REQUEST });
            expect(spy.dispatch.calls.argsFor(1)).toEqual({ type: ActionTypes.FETCH_SUCCESS, amount: 100 });
        });
    });

    it('fetchAmount fail',  () => {
        mock.onGet('/api/count').reply(400, {});

        const spy:any = {dispatch: null};
        spyOn(spy, 'dispatch');
        const actions = new DispatchActions(spy.dispatch);
        return actions.fetchAmount().then(() => {
            expect(spy.dispatch.calls.argsFor(0)).toEqual({ type: ActionTypes.FETCH_REQUEST });
            expect(spy.dispatch.calls.argsFor(1)).toEqual({ type: ActionTypes.FETCH_FAIL });
        });
    });
});