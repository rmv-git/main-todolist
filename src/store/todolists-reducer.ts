import {FilterValuesType, TodolistType} from "../types";
import {v1} from "uuid";

export const todolistsReducer = (state: Array<TodolistType>, action: ActionsType) => {
    switch (action.type) {
        case 'CHANGE_TODOLIST_TITLE':
            return state.map(todolist => todolist.id === action.todolistId ? {...todolist, title: action.title} : todolist)
        case 'CHANGE_TODOLIST_FILTER':
            return state.map(todolist => todolist.id === action.todolistId ? {...todolist, filter: action.filter} : todolist)
        case 'ADD_TODOLIST':
            const todolistId = v1();
            const todolist: TodolistType = {id: todolistId, title: action.title, filter: 'All'};
            return [...state, todolist]
        default:
            return state;
    }
}

type ActionsType = ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | AddTodolistActionType;

type ChangeTodolistTitleActionType = {
    type: 'CHANGE_TODOLIST_TITLE'
    todolistId: string
    title: string
}
type ChangeTodolistFilterActionType = {
    type: 'CHANGE_TODOLIST_FILTER'
    todolistId: string
    filter: FilterValuesType
}
type AddTodolistActionType = {
    type: 'ADD_TODOLIST'
    title: string
}
export const changeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => {
    return {
        type: 'CHANGE_TODOLIST_TITLE',
        todolistId,
        title,
    }
}
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {
        type: 'CHANGE_TODOLIST_FILTER',
        todolistId,
        filter,
    }
}

export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {
        type: 'ADD_TODOLIST',
        title,
    }
}