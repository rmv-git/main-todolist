import {TaskPriorities, TaskResponseType, TaskStatuses, TasksType} from "./../types/types";
import {AddTodolistActionType, GetTodolistsActionType, RemoveTodolistActionType} from "./todolists-reducer";
import {v1} from "uuid";

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
        default:
            return state
    }
}

type AddTaskActionType = ReturnType<typeof addTaskAC>;
type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>;
type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>;

type ActionsType = AddTaskActionType
    | RemoveTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType;


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
