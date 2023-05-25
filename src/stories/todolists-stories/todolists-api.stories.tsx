import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistsAPI} from "../../api/API";

export default {
    title: 'API'
}

const settings = {
    withCredentials: true
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.getTodolists().then(
            response => setState(response.data))
        // axios.get(`https://social-network.samuraijs.com/api/1.1/todo-lists`, settings)
        //     .then(response => setState(response.data))
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)

    const title = 'aaaAAA';

    useEffect(() => {
        todolistsAPI.createTodolist(title).then(response =>
            setState(response.data)
        )
        // axios.post(`https://social-network.samuraijs.com/api/1.1/todo-lists`, {title}, settings)
        //     .then(response => setState(response.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)

    const todolistId = '5de9379c-b8e9-483f-8daf-3e8c33361c04';
    useEffect(() => {
        todolistsAPI.deleteTodolist(todolistId).then(
            response => setState(response.data)
        )
        // axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
        //     .then(response => setState(response.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)

    const todolistId = 'fa7dce31-13dd-4b2e-9d8a-64f10797c62a';
    const title = 'UPD TITLE!!!!11'

    useEffect(() => {
        todolistsAPI.updateTodolist(todolistId, title).then(
            response => setState(response.data)
        )
        // axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title}, settings)
        //     .then(response => setState(response.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
