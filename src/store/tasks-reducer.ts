import {TaskPriorities, TaskResponseType, TaskStatuses, TasksType, UpdateTaskModelType} from "../types/types";
import {
    AddTodolistActionType,
    changeTodolistEntityStatusAC,
    GetTodolistsActionType,
    RemoveTodolistActionType
} from "./todolists-reducer";
import {v1} from "uuid";
import {Dispatch} from "redux";
import {todolistsAPI} from "../api/API";
import {RootStateType} from "./redux-store";
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

const initialState: TasksType = {};

export const tasksReducer = (state = initialState, action: ActionsType | AddTodolistActionType | RemoveTodolistActionType | GetTodolistsActionType): TasksType => {
    switch (action.type) {
        case 'ADD_TODOLIST':
            return {...state, [action.todolist.id]: []}
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
                    task => task.id === action.taskId ? {...task, title: action.updateModel.title} : task
                )
            }
        case 'CHANGE_TASK_STATUS':
            return {
                ...state, [action.todolistId]: state[action.todolistId].map(
                    task => task.id === action.taskId ? {...task, status: action.updateModel.status} : task
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
        case 'GET_TASKS': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
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


export const addTaskAC = (todolistId: string, title: string) => ({
    type: 'ADD_TASK',
    todolistId,
    title,
} as const)

export const removeTaskAC = (todolistId: string, taskId: string) => ({
    type: 'REMOVE_TASK',
    todolistId,
    taskId,
} as const)

export const changeTaskTitleAC = (todolistId: string, taskId: string, updateModel: UpdateTaskModelType) => ({
    type: 'CHANGE_TASK_TITLE',
    todolistId,
    taskId,
    updateModel,
} as const)

export const changeTaskStatusAC = (todolistId: string, taskId: string, updateModel: UpdateTaskModelType) => ({
    type: 'CHANGE_TASK_STATUS',
    todolistId,
    taskId,
    updateModel,
} as const)
export const getTasksAC = (todolistId: string, tasks: TaskResponseType[]) => ({
    type: 'GET_TASKS',
    todolistId,
    tasks
} as const)

export const getTasksThunk = (todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.getTasks(todolistId)
        .then(response => {
            dispatch(getTasksAC(todolistId, response.data.items))
        })
}

export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTask(todolistId, taskId)
        .then(response => {
            dispatch(removeTaskAC(todolistId, taskId))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const createTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
    todolistsAPI.createTask(todolistId, title)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(addTaskAC(todolistId, title))
                dispatch(setAppStatusAC('succeeded'))
                dispatch(changeTodolistEntityStatusAC(todolistId, 'succeeded'))
            } else {
                handleServerAppError(response.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const changeTaskTitleTC = (todolistId: string, taskId: string, updateTaskModel: UpdateTaskDomainType) => (dispatch: Dispatch<ActionsType | SetAppErrorActionType | SetAppStatusActionType>, getState: () => RootStateType) => {

    const state = getState();

    const task = state.tasksReducer[todolistId].find((t: any) => t.id === taskId);
    if (!task) {
        console.warn('Error');
        return
    }
    const updateModel: UpdateTaskModelType = {
        title: task.title,
        status: task.status,
        priority: task.priority,
        deadline: task.deadline,
        startDate: task.startDate,
        description: task.description,
        ...updateTaskModel,
    }

    dispatch(setAppStatusAC('loading'))
    todolistsAPI.updateTask(todolistId, taskId, updateModel)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(changeTaskTitleAC(todolistId, taskId, updateModel))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(response.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const changeTaskStatusTC = (todolistId: string, taskId: string, updateTaskModel: UpdateTaskDomainType) => (dispatch: Dispatch<ActionsType | SetAppStatusActionType>, getState: () => RootStateType) => {

    const state = getState();

    const task = state.tasksReducer[todolistId].find((t: any) => t.id === taskId);
    if (!task) {
        console.warn('Error');
        return
    }

    const updateModel: UpdateTaskModelType = {
        title: task.title,
        status: task.status,
        priority: task.priority,
        deadline: task.deadline,
        startDate: task.startDate,
        description: task.description,
        ...updateTaskModel,
    }

    dispatch(setAppStatusAC('loading'))
    todolistsAPI.updateTask(todolistId, taskId, updateModel)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(changeTaskStatusAC(todolistId, taskId, updateModel))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(response.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export type UpdateTaskDomainType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

