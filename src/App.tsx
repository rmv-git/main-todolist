import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {Todolist} from "./Todolist";
import {FilterValuesType, TaskType, TodolistType} from "./types";

export const App = () => {

    let [taskFilter, setTaskFilter] = useState<FilterValuesType>('All');

    let [todolists, setTodolists] = useState<Array<TodolistType>>(
        [
            {id: v1(), title: 'What to learn', filter: 'All'},
            {id: v1(), title: 'What to buy', filter: 'All'},
        ]
    );

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
    const changeTaskTitle = (id: string, title: string) => {
        setTasks(tasks.map((task: TaskType) => task.id === id ? {...task, title} : task));
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
            {
                todolists.map((todolist: TodolistType) => {
                    return (
                        <Todolist key={todolist.id}
                                  title={todolist.title}
                                  tasks={filteredTasks}
                                  addTask={addTask}
                                  removeTask={removeTask}
                                  setTaskFilter={setTaskFilter}
                                  changeTaskStatus={changeTaskStatus}
                                  changeTaskTitle={changeTaskTitle}/>)
                })
            }
        </div>
    );
}
