import {ActionTypes} from "../Entities";
import {DispatchActions} from "../DispatchActions";
import {assert} from "chai";
import {spy} from "sinon";
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
        const spyCB:any = spy();
        const actions = new DispatchActions(spyCB);
        actions.increment(100);
        assert(spyCB.calledOnce);
        assert(spyCB.calledWith({ type: ActionTypes.INCREMENT, amount: 100 }));
    });

    it('fetchAmount success',  () => {

        mock.onGet('/api/count').reply(200, { amount: 100 });
        const spyCB:any = spy();
        const actions = new DispatchActions(spyCB);
        return actions.fetchAmount().then(() => {
            assert.deepEqual(spyCB.getCall(0).args[0], { type: ActionTypes.FETCH_REQUEST });
            assert.deepEqual(spyCB.getCall(1).args[0], { type: ActionTypes.FETCH_SUCCESS, amount: 100 });
        });
    });

    it('fetchAmount fail',  () => {
        mock.onGet('/api/count').reply(400, {});

        const spyCB:any = spy();
        const actions = new DispatchActions(spyCB);
        return actions.fetchAmount().then(() => {
            assert.deepEqual(spyCB.getCall(0).args[0], { type: ActionTypes.FETCH_REQUEST });
            assert.deepEqual(spyCB.getCall(1).args[0], { type: ActionTypes.FETCH_FAIL });
        });
    });
});