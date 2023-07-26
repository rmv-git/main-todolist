export type FilterValuesType = 'All' | 'Active' | 'Completed';

export type TodolistResponseType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}
export type TodolistsResponseType = {
    items: TodolistResponseType[],
    totalCount: number,
    error: string,
}
export type TaskResponseType = {
    description: string,
    title: string,
    completed: boolean,
    status: TaskStatuses,
    priority: TaskPriorities,
    startDate: string,
    deadline: string,
    id: string,
    todoListId: string,
    order: number,
    addedDate: string,
}
export type TasksType = {
    [key: string]: Array<TaskResponseType>;
}

export type GetTasksResponseType = {
    items: TaskResponseType[],
    totalCount: number,
    error: string,
}
export type TodolistDomainType = TodolistResponseType & {
    filter: FilterValuesType,
    entityStatus: RequestStatusType ,
}

export type ResponseType<T = {}> = {
    resultCode: number,
    messages: string[],
    fieldsErrors: string[],
    data: T,
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type UpdateTaskModelType = {
    title: string,
    description: string,
    status: TaskStatuses,
    priority: TaskPriorities,
    startDate: string,
    deadline: string,
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
