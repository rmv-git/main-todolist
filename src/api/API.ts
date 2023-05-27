import axios from "axios";
import {
    GetTasksResponseType,
    ResponseType,
    TaskResponseType,
    TodolistResponseType,
    UpdateTaskModelType
} from "../types/types";

export const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1/`,
    withCredentials: true,
    headers: {
        'API-KEY': '572e1a8a-45f3-47bb-ae0b-b4ef4ceb038e'
    }
});

export const todolistsAPI = {
    getTodolists() {
        return instance.get<TodolistResponseType[]>(`todo-lists`)
    },
    createTodolist(title: string) {
        return instance.post<ResponseType>(`todo-lists`, {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType<TodolistResponseType>>(`todo-lists/${todolistId}`, {title})
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(` /todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskResponseType }>>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(todolistId: string, taskId: string, updateModal: UpdateTaskModelType) {
        return instance.put<ResponseType<{ item: TaskResponseType }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, updateModal)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
}
