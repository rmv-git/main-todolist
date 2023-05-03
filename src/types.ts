export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}
export type TodolistType = {
    id: string;
    title: string;
    filter: FilterValuesType;
}

export type TasksType = {
    [key: string]: Array<TaskType>;
}

export type FilterValuesType = 'All' | 'Active' | 'Completed';
