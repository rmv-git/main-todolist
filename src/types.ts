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

export type FilterValuesType = 'All' | 'Active' | 'Completed';
