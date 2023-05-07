import {TasksType, TaskType} from "../types";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";
import {v1} from "uuid";

export const tasksReducer = (state: TasksType, action: ActionsType | AddTodolistActionType | RemoveTodolistActionType) => {
    switch (action.type) {
        case 'ADD_TODOLIST':
            return {...state, [action.todolistId]: []}
        case 'ADD_TASK':
            const task: TaskType = {id: v1(), title: action.title, isDone: false};
            return {
                ...state,
                [action.todolistId]: [...state[action.todolistId], task]
            }
        case 'REMOVE_TASK':
            return {
                ...state, [action.todolistId]: state[action.todolistId].filter(
                    task => task.id !== action.taskId
                )
            }
        case 'CHANGE_TASK_TITLE':
            return {
                ...state, [action.todolistId]: state[action.todolistId].map(
                    task => task.id === action.taskId ? {...task, title: action.title} : task
                )
            }
        case 'CHANGE_TASK_STATUS':
            return {
                ...state, [action.todolistId]: state[action.todolistId].map(
                    task => task.id === action.taskId ? {...task, isDone: action.isDone} : task
                )
            }
        case 'REMOVE_TODOLIST':
            const copyState = {...state};
            delete copyState[action.todolistId];
            return copyState;
        default:
            return state
    }
}

type ActionsType = AddTaskActionType
    | RemoveTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType;

type AddTaskActionType = {
    type: 'ADD_TASK'
    todolistId: string
    title: string
}
type RemoveTaskActionType = {
    type: 'REMOVE_TASK'
    todolistId: string
    taskId: string
}
type ChangeTaskTitleActionType = {
    type: 'CHANGE_TASK_TITLE'
    todolistId: string
    taskId: string
    title: string
}
type ChangeTaskStatusActionType = {
    type: 'CHANGE_TASK_STATUS'
    todolistId: string
    taskId: string
    isDone: boolean
}

export const addTaskAC = (todolistId: string, title: string): AddTaskActionType => {
    return {
        type: 'ADD_TASK',
        todolistId,
        title,
    }
}

export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskActionType => {
    return {
        type: 'REMOVE_TASK',
        todolistId,
        taskId,
    }
}

export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string): ChangeTaskTitleActionType => {
    return {
        type: 'CHANGE_TASK_TITLE',
        todolistId,
        taskId,
        title,
    }

}
export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean): ChangeTaskStatusActionType => {
    return {
        type: 'CHANGE_TASK_STATUS',
        todolistId,
        taskId,
        isDone,
    }
}
