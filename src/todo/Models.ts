import {deleteAction, addAction, fetchAllAction, changeStatusAction} from "./ActionCreators";
import {List, Map} from "immutable";

export interface TodoInterface {
    id: number;
    text: string;
    isComplete: boolean;
}

export class Todo implements TodoInterface{
    constructor(public id: number, public text: string, public isComplete: boolean){
    }
}

export interface TodoState {
    todos: List<Todo>;
    marks: Map<boolean, string>;
}

export interface MyAction {
    type: string;
    id?: number;
    text?: string;
    todos?: List<Todo>;
}

export class DispatchActions {
    private dispatch: (action: any) => any;
    constructor(dispatch: (action: any) => any){
        this.dispatch = dispatch
    }

    public changeTodoStatus(id: number) {
        this.dispatch(changeStatusAction(id))
    }

    public createTodo(text: string) {
        this.dispatch(addAction(text))
    }

    public deleteTodo(id: number) {
        this.dispatch(deleteAction(id))
    }

    public fetchAll() {
        this.dispatch(fetchAllAction())
    }
}

export class ActionTypes{
    static CHANGE_TODO_STATUS = 'CHANGE_TODO_STATUS';
    static ADD_TODO = 'TODO_ADD';
    static DELETE_TODO = 'TODO_DELETE';
    static FETCH_ALL = 'TODO_FETCH_ALL';
    static FETCH_REQUEST = 'TODO_FETCH_REQUEST';
    static FETCH_FAIL = 'TODO_FETCH_FAIL';
}
