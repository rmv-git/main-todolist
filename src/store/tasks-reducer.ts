import {TasksType} from "../types";
import {AddTodolistActionType} from "./todolists-reducer";

export const tasksReducer = (state: TasksType, action: AddTodolistActionType) => {
    switch (action.type) {
        case 'ADD_TODOLIST':
            return {...state, [action.todolistId]: []}
        default:
            return state
    }
}

