import {toast} from "../Materialize";

describe('Material', () => {
    it('toast call do not throw error', () => {
        toast("hello", 22)
    });
});