import {v1} from "uuid";
import {FilterValuesType, RequestStatusType, TodolistDomainType, TodolistResponseType} from "../types/types";
import {Dispatch} from "redux";
import {todolistsAPI} from "../api/API";
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

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
            return [...state, {...action.todolist, filter: 'All', entityStatus: 'idle'}]
        case 'REMOVE_TODOLIST':
            return state.filter(todolist => todolist.id !== action.todolistId)
        case 'GET_TODOLISTS': {
            return action.todolists.map(todolist => {
                return {
                    ...todolist, filter: 'All', entityStatus: 'idle'
                }
            })
        }
        case 'CHANGE_ENTITY_STATUS':
            return state.map(todolist => todolist.id === action.todolistId ? {
                ...todolist, entityStatus: action.entityStatus
            } : todolist)
        default:
            return state;
    }
}

type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>;
type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>;
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type GetTodolistsActionType = ReturnType<typeof getTodolistsAC>;
export type ChangeTodolistEntityStatusType = ReturnType<typeof changeTodolistEntityStatusAC>;

type ActionsType = ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | GetTodolistsActionType
    | ChangeTodolistEntityStatusType;

export const changeTodolistTitleAC = (todolistId: string, title: string) => ({
    type: 'CHANGE_TODOLIST_TITLE',
    todolistId,
    title,
} as const)
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => ({
    type: 'CHANGE_TODOLIST_FILTER',
    todolistId,
    filter,
} as const)

export const addTodolistAC = (todolist: TodolistResponseType) => ({
    type: 'ADD_TODOLIST',
    todolistId: v1(),
    todolist,
} as const)
export const removeTodolistAC = (todolistId: string) => ({
    type: 'REMOVE_TODOLIST',
    todolistId,
} as const)

export const getTodolistsAC = (todolists: TodolistResponseType[]) => ({
    type: 'GET_TODOLISTS',
    todolists,
} as const)
export const changeTodolistEntityStatusAC = (todolistId: string, entityStatus: RequestStatusType) => ({
    type: 'CHANGE_ENTITY_STATUS',
    todolistId,
    entityStatus,
} as const)


export const getTodolistsThunk = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.getTodolists()
        .then(response => {
            dispatch(getTodolistsAC(response.data))
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const createTodolistThunk = (title: string) => (dispatch: Dispatch<AddTodolistActionType | SetAppStatusActionType | SetAppErrorActionType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.createTodolist(title)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(addTodolistAC(response.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(response.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const removeTodolistThunk = (todolistId: string) => (dispatch: Dispatch<RemoveTodolistActionType | SetAppStatusActionType | ChangeTodolistEntityStatusType>) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
    todolistsAPI.deleteTodolist(todolistId)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(removeTodolistAC(todolistId));
                dispatch(setAppStatusAC('succeeded'));
                dispatch(changeTodolistEntityStatusAC(todolistId, 'succeeded'))

            } else {
                handleServerAppError(response.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const changeTodolistTitleThunk = (todolistId: string, title: string) => (dispatch: Dispatch<ChangeTodolistTitleActionType | SetAppStatusActionType | SetAppErrorActionType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.updateTodolist(todolistId, title)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(changeTodolistTitleAC(todolistId, title));
            } else {
                handleServerAppError(response.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
