import {TaskPriorities, TaskResponseType, TaskStatuses, TasksType} from "./../types/types";
import {
    AddTodolistActionType,
    getTodolistsAC,
    GetTodolistsActionType,
    RemoveTodolistActionType
} from "./todolists-reducer";
import {v1} from "uuid";
import {AnyAction, Dispatch} from "redux";
import {todolistsAPI} from "../api/API";
import {AppDispatch, RootStateType} from "./redux-store";
import {ThunkAction, ThunkDispatch} from "redux-thunk";

const initialState: TasksType = {};

export const tasksReducer = (state = initialState, action: ActionsType | AddTodolistActionType | RemoveTodolistActionType | GetTodolistsActionType): TasksType => {
    switch (action.type) {
        case 'ADD_TODOLIST':
            return {...state, [action.todolistId]: []}
        case 'ADD_TASK':
            const task: TaskResponseType = {
                id: v1(),
                title: action.title,
                addedDate: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                deadline: '',
                completed: false,
                startDate: '',
                description: '',
                order: 0,
                todoListId: action.todolistId,
            };
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
        case 'REMOVE_TODOLIST': {
            const copyState = {...state};
            delete copyState[action.todolistId];
            return copyState;
        }
        case 'GET_TODOLISTS': {
            const copyState = {...state};

            action.todolists.forEach(todolist => {
                copyState[todolist.id] = [];
            })

            return copyState;
        }
        case 'GET_TASKS':
            return {
                ...state, tasks: action.tasks
            }
        default:
            return state
    }
}

type AddTaskActionType = ReturnType<typeof addTaskAC>;
type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>;
type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>;
type GetTasksActionType = ReturnType<typeof getTasksAC>;

type ActionsType = AddTaskActionType
    | RemoveTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | GetTasksActionType;


export const addTaskAC = (todolistId: string, title: string) => {
    return {
        type: 'ADD_TASK',
        todolistId,
        title,
    } as const
}

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'REMOVE_TASK',
        todolistId,
        taskId,
    } as const
}

export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {
        type: 'CHANGE_TASK_TITLE',
        todolistId,
        taskId,
        title,
    } as const

}
export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) => {
    return {
        type: 'CHANGE_TASK_STATUS',
        todolistId,
        taskId,
        isDone,
    } as const
}
export const getTasksAC = (todoListId: string, tasks: TaskResponseType[]) => {
    return {
        type: 'GET_TASKS',
        todoListId,
        tasks
    } as const
}

export const getTasksThunk = (todolistId: string)/*: ThunkAction<void, RootStateType, unknown, GetTasksActionType>*/ => {
    return () => {
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                getTasksAC(todolistId, res.data.items)
            })
    }
}