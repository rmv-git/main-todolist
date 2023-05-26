// import {FilterValuesType} from "../types";
import {v1} from "uuid";
import {FilterValuesType, TodolistDomainType} from "../types/types";

const initialState: Array<TodolistDomainType> = [];
export const todolistsReducer = (state = initialState, action: ActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case 'CHANGE_TODOLIST_TITLE':
            return state.map(todolist => todolist.id === action.todolistId ? {
                ...todolist,
                title: action.title
            } : todolist)
        case 'CHANGE_TODOLIST_FILTER':
            return state.map(todolist => todolist.id === action.todolistId ? {
                ...todolist,
                filter: action.filter
            } : todolist)
        case 'ADD_TODOLIST':
            const todolist: TodolistDomainType = {id: action.todolistId, title: action.title, filter: 'All', order: 0, addedDate: ''};
            return [...state, todolist]
        case 'REMOVE_TODOLIST':
            return state.filter(todolist => todolist.id !== action.todolistId)
        default:
            return state;
    }
}

type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>;
type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>;
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;

type ActionsType = ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | AddTodolistActionType
    | RemoveTodolistActionType;

export const changeTodolistTitleAC = (todolistId: string, title: string) => {
    return {
        type: 'CHANGE_TODOLIST_TITLE',
        todolistId,
        title,
    } as const
}
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE_TODOLIST_FILTER',
        todolistId,
        filter,
    } as const
}

export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD_TODOLIST',
        todolistId: v1(),
        title,
    } as const
}
export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE_TODOLIST',
        todolistId,
    } as const
}
