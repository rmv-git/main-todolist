import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type TaskType = {
    id: number;
    title: string;
    isDone: boolean;
}

export type FilterValuesType = 'All' | 'Active' | 'Completed';

export const App = () => {

    let [taskFilter, setTaskFilter] = useState<FilterValuesType>('All');
/*    const ArrayWhatToLearn = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false}
    ];*/
    let [tasks, setTasks] = useState<Array<TaskType>>(
        [
            {id: 1, title: 'HTML&CSS', isDone: true},
            {id: 2, title: 'JS', isDone: true},
            {id: 3, title: 'ReactJS', isDone: false},
        ],
    );
/*    const ArrayBooks = [
        {id: 1, title: '1984', isDone: true},
        {id: 2, title: 'The Financier', isDone: true},
        {id: 3, title: 'The Stoic', isDone: true},
        {id: 4, title: 'The Titan', isDone: true},
        {id: 5, title: 'The Double', isDone: true},
        {id: 6, title: 'The Master and Margarita', isDone: false},
    ];*/

    const addTask = (title: string) => {
        const task: TaskType = {id: 4, title: title, isDone: false};
        setTasks([...tasks, task]);
    }
    const removeTask = (id: number) => {
        setTasks(tasks.filter((task: TaskType) => task.id !== id));
    }

    let filteredTasks = tasks;

    if (taskFilter === 'Active') {
        filteredTasks = tasks.filter(t => !t.isDone);
    }
    if (taskFilter === 'Completed') {
        filteredTasks = tasks.filter(t => t.isDone);
    }

    return (
        <div className="App">
            <Todolist title={'What to learn'}
                      tasks={filteredTasks}
                      removeTask={removeTask}
                      taskFilter={taskFilter}
                      setTaskFilter={setTaskFilter}
                      addTask={addTask}
            />
{/*            <Todolist title={'Books'}
                      tasks={ArrayBooks}
            />*/}
        </div>
    );
}
