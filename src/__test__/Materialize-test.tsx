import {toast} from "../Materialize";

describe('Material test', () => {
    it('toast call do not throw error', () => {
        toast("hello", 22)
    });
});