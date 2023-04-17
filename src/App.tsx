import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {FilterValuesType, TaskType} from "./types";

export const App = () => {

    let [taskFilter, setTaskFilter] = useState<FilterValuesType>('All');

    let [tasks, setTasks] = useState<Array<TaskType>>(
        [
            {id: 1, title: 'HTML&CSS', isDone: true},
            {id: 2, title: 'JS', isDone: true},
            {id: 3, title: 'ReactJS', isDone: false},
        ],
    );

    const addTask = (title: string) => {
        const task: TaskType = {id: 4, title: title, isDone: false};
        setTasks([...tasks, task]);
    }
    const removeTask = (id: number) => {
        setTasks(tasks.filter((task: TaskType) => task.id !== id));
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
            />
        </div>
    );
}
