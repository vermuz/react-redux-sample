import {toast} from "../Materialize";

describe('Material test', () => {
    it('toast call dont throw error', () => {
        toast("hello", 22)
    });
});