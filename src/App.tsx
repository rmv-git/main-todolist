import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {Todolist} from "./Todolist";
import {FilterValuesType, TasksType, TaskType, TodolistType} from "./types";

export const App = () => {

    let [taskFilter, setTaskFilter] = useState<FilterValuesType>('All');

    const todolistID1 = v1();
    const todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>(
        [
            {id: todolistID1, title: 'What to learn', filter: 'All'},
            {id: todolistID2, title: 'What to buy', filter: 'All'},
        ]
    );

    let [tasks, setTasks] = useState<TasksType>(
        {
            [todolistID1]: [
                {id: v1(), title: 'HTML&CSS', isDone: true},
                {id: v1(), title: 'JS', isDone: true},
                {id: v1(), title: 'ReactJS', isDone: false},
            ],
            [todolistID2]: [
                {id: v1(), title: 'Milk', isDone: true},
                {id: v1(), title: 'Bread', isDone: true},
                {id: v1(), title: 'Butter', isDone: false},
            ],
        }
    );

    // let [tasks, setTasks] = useState<Array<TaskType>>(
    //     [
    //         {id: v1(), title: 'HTML&CSS', isDone: true},
    //         {id: v1(), title: 'JS', isDone: true},
    //         {id: v1(), title: 'ReactJS', isDone: false},
    //     ],
    // );

    const addTask = (todolistId: string, title: string) => {
        const task: TaskType = {id: v1(), title: title, isDone: false};
        setTasks({
            [todolistId]: [...tasks[todolistId], task]
        })
        // setTasks([...tasks, task]);
    }
    const removeTask = (todolistId: string, id: string) => {
        setTasks({
            ...tasks, [todolistId]: tasks[todolistId].filter(
                task => task.id !== id
            )
        })
        // setTasks(tasks.filter((task: TaskType) => task.id !== id));
    }
    const changeTaskStatus = (todolistId: string, id: string, isDone: boolean) => {
        setTasks({
            ...tasks, [todolistId]: tasks[todolistId].map(
                task => task.id === id ? {...task, isDone} : task)
        })
        // setTasks(tasks.map(task => task.id === id ? {...task, isDone} : task));
    }
    const changeTaskTitle = (todolistId: string, id: string, title: string) => {
        setTasks({
            ...tasks, [todolistId]: tasks[todolistId].map(
                task => task.id === id ? {...task, title} : task)
        })
        // setTasks(tasks.map((task: TaskType) => task.id === id ? {...task, title} : task));
    }

    const changeTodolistFilter = (todolistId: string, filter: FilterValuesType) => {
        setTodolists(
            todolists.map(todolist => todolist.id === todolistId ? {...todolist, filter} : todolist)
        )
    }

    // let filteredTasks = tasks[todolist.id];
    //
    // if (taskFilter === 'Active') {
    //     filteredTasks = tasks.filter(task => !task.isDone);
    // }
    // if (taskFilter === 'Completed') {
    //     filteredTasks = tasks.filter(task => task.isDone);
    // }

    return (
        <div className="App">
            {
                todolists.map((todolist: TodolistType) => {

                    let filteredTasks = tasks[todolist.id];

                    if (taskFilter === 'Active') {
                        filteredTasks = tasks[todolist.id].filter(task => !task.isDone);
                    }
                    if (taskFilter === 'Completed') {
                        filteredTasks = tasks[todolist.id].filter(task => task.isDone);
                    }

                    return (
                        <Todolist key={todolist.id}
                                  todolistId={todolist.id}
                                  title={todolist.title}
                                  tasks={filteredTasks}
                                  addTask={addTask}
                                  filter={todolist.filter}
                                  removeTask={removeTask}
                                  setTaskFilter={setTaskFilter}
                                  changeTaskStatus={changeTaskStatus}
                                  changeTaskTitle={changeTaskTitle}/>)
                })
            }
        </div>
    );
}
