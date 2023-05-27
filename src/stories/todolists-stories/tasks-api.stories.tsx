import React, {useEffect, useState} from 'react'
import {todolistsAPI} from "../../api/API";
import {TaskPriorities, TaskStatuses, UpdateTaskModelType} from "../../types/types";

export default {
    title: 'TASKS_API'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null);
    const todolistId = '2508b22d-ab73-4ebf-a694-bc0e689d9be5';
    useEffect(() => {
        todolistsAPI.getTasks(todolistId)
            .then((response) => {
                setState(response.data)
            })
    }, []);
    return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null);
    const todolistId = '2508b22d-ab73-4ebf-a694-bc0e689d9be5';
    const title = 'task7777';
    useEffect(() => {
        todolistsAPI.createTask(todolistId, title)
            .then((response) => {
                setState(response.data)
            })
    }, []);
    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null);
    const todolistId = '2508b22d-ab73-4ebf-a694-bc0e689d9be5';
    const taskId = '6137d174-b4df-4bf2-a292-b17a35d90cce'
    const updateModel: UpdateTaskModelType = {
        title: 'STORYBOOK',
        description: '',
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
    };
    useEffect(() => {
        todolistsAPI.updateTask(todolistId, taskId, updateModel)
            .then((response) => {
                setState(response.data)
            })
    }, []);
    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null);
    const todolistId = '2508b22d-ab73-4ebf-a694-bc0e689d9be5';
    const taskId = '6137d174-b4df-4bf2-a292-b17a35d90cce'
    useEffect(() => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then((response) => {
                setState(response.data)
            })
    }, []);
    return <div> {JSON.stringify(state)}</div>
}