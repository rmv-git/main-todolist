import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {Todolist} from "./Todolist";
import {FilterValuesType, TaskType} from "./types";

export const App = () => {

    let [taskFilter, setTaskFilter] = useState<FilterValuesType>('All');

    let [tasks, setTasks] = useState<Array<TaskType>>(
        [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
    );

    const addTask = (title: string) => {
        const task: TaskType = {id: v1(), title: title, isDone: false};
        setTasks([...tasks, task]);
    }
    const removeTask = (id: string) => {
        setTasks(tasks.filter((task: TaskType) => task.id !== id));
    }
    const changeTaskStatus = (id: string, isDone: boolean) => {
        setTasks(tasks.map(task => task.id === id ? {...task, isDone} : task));
    }

    let filteredTasks = tasks;

    if (taskFilter === 'Active') {
        filteredTasks = tasks.filter(task => !task.isDone);
    }
    if (taskFilter === 'Completed') {
        filteredTasks = tasks.filter(task => task.isDone);
    }

    return (
        <div className="App">
            <Todolist title={'What to learn'}
                      tasks={filteredTasks}
                      removeTask={removeTask}
                      setTaskFilter={setTaskFilter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}
