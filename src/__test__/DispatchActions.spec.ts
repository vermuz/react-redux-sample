import {ActionTypes} from "../Entities";
import {DispatchActions} from "../DispatchActions";
const request = require('superagent');
const mock = require('superagent-mocker')(request);

describe('DispatchActions', () => {


    beforeEach(() => {
        mock.clearRoutes()
    });

    it('increment',  () => {
        const spy:any = {dispatch: null};
        spyOn(spy, 'dispatch');
        const actions = new DispatchActions(spy.dispatch);
        actions.increment(100);
        expect(spy.dispatch).toHaveBeenCalledWith({ type: ActionTypes.INCREMENT, amount: 100});
    });

    it('fetchAmount success',  (done) => {

        mock.get('/api/count', () => ({body: {amount: 100}, status: 200}));

        const spy:any = {dispatch: null};
        spyOn(spy, 'dispatch');
        const actions = new DispatchActions(spy.dispatch);
        actions.fetchAmount().then(() => {
            expect(spy.dispatch.calls.argsFor(0)[0]).toEqual({ type: ActionTypes.FETCH_REQUEST });
            expect(spy.dispatch.calls.argsFor(1)[0]).toEqual({ type: ActionTypes.FETCH_SUCCESS, amount: 100 });
            done();
        });
    });

    it('fetchAmount fail',  (done) => {

        mock.get('/api/count', () => ({body: {}, status: 400}));

        const spy:any = {dispatch: null};
        spyOn(spy, 'dispatch');
        const actions = new DispatchActions(spy.dispatch);
        actions.fetchAmount().then(() => {
            expect(spy.dispatch.calls.argsFor(0)[0]).toEqual({ type: ActionTypes.FETCH_REQUEST });
            expect(spy.dispatch.calls.argsFor(1)[0]).toEqual({ type: ActionTypes.FETCH_FAIL });
            done();
        });
    });
});