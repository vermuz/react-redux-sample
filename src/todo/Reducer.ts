import {TodoState, MyAction, ActionTypes, Todo} from "./Models";
import {List, Map} from "immutable";
import objectAssign = require('object-assign');

const marks = Map.of<boolean, string>(true, "■", false, "□");

const initialState:TodoState = {todos: List.of<Todo>(), marks: marks};

export function todoReduce(state: TodoState = initialState, action: MyAction): TodoState {

    function changeStatus(state: TodoState, action: MyAction):TodoState {
        const newTodos = state.todos.map(v => {
            if (v.id === action.id) return new Todo(v.id, v.text, !v.isComplete);
            return v
        });
        return objectAssign({}, state, {todos: newTodos});
    }

    function addTodo(state: TodoState, action: MyAction):TodoState {
        let newNumber = 1;
        if(!state.todos.isEmpty()) newNumber = state.todos.map(v => v.id).max() + 1;
        const newTodo = new Todo(newNumber, action.text, false);
        return objectAssign({}, state, {todos: state.todos.push(newTodo)});
    }

    function deleteTodo(state:TodoState, action:MyAction):TodoState {
        return objectAssign({}, state, {todos: state.todos.filter(item => item.id !== action.id)});
    }

    function fetchAll(state:TodoState, action:MyAction) {
        return objectAssign({}, state, {todos: action.todos})
    }

    //console.log(state.marks);
    switch (action.type) {
        case ActionTypes.CHANGE_TODO_STATUS:
            return changeStatus(state, action);
        case ActionTypes.ADD_TODO:
            return addTodo(state, action);
        case ActionTypes.DELETE_TODO:
            return deleteTodo(state, action);
        case ActionTypes.FETCH_ALL:
            return fetchAll(state, action);
        default:
            return state
    }
}