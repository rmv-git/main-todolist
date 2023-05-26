import axios from "axios";
import {ResponseType, TodolistResponseType} from "../types/types";

export const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1/`,
    withCredentials: true,
    headers: {
        'API-KEY': ''
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
    }
}
