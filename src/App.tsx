import React, {useReducer, useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {Todolist} from "./Todolist";
import {FilterValuesType, TasksType, TaskType, TodolistType} from "./types";
import {InputForm} from "./components/input-form/InputForm";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, removeTodolistAC,
    todolistsReducer
} from "./store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./store/tasks-reducer";

export const App = () => {

    const todolistID1 = v1();
    const todolistID2 = v1();

    // let [todolists, setTodolists] = useState<Array<TodolistType>>(
    //     [
    //         {id: todolistID1, title: 'What to learn', filter: 'All'},
    //         {id: todolistID2, title: 'What to buy', filter: 'All'},
    //     ]
    // );
    //
    // let [tasks, setTasks] = useState<TasksType>(
    //     {
    //         [todolistID1]: [
    //             {id: v1(), title: 'HTML&CSS', isDone: true},
    //             {id: v1(), title: 'JS', isDone: true},
    //             {id: v1(), title: 'ReactJS', isDone: false},
    //         ],
    //         [todolistID2]: [
    //             {id: v1(), title: 'Milk', isDone: true},
    //             {id: v1(), title: 'Bread', isDone: true},
    //             {id: v1(), title: 'Butter', isDone: false},
    //         ],
    //     }
    // );
    let [todolists, dispatchToTodolists] = useReducer(
        todolistsReducer,
        [
            {id: todolistID1, title: 'What to learn', filter: 'All'},
            {id: todolistID2, title: 'What to buy', filter: 'All'},
        ]
    );

    let [tasks, dispatchToTasks] = useReducer(
        tasksReducer,
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
    const addTask = (todolistId: string, title: string) => {
        dispatchToTasks(addTaskAC(todolistId, title));
        // const task: TaskType = {id: v1(), title: title, isDone: false};
        // setTasks({
        //     ...tasks,
        //     [todolistId]: [...tasks[todolistId], task]
        // })
    }
    const removeTask = (todolistId: string, id: string) => {
        dispatchToTasks(removeTaskAC(todolistId, id))
        // setTasks({
        //     ...tasks, [todolistId]: tasks[todolistId].filter(
        //         task => task.id !== id
        //     )
        // })
    }
    const changeTaskStatus = (todolistId: string, id: string, isDone: boolean) => {
        dispatchToTasks(changeTaskStatusAC(todolistId, id, isDone))
        // setTasks({
        //     ...tasks, [todolistId]: tasks[todolistId].map(
        //         task => task.id === id ? {...task, isDone} : task)
        // })
    }
    const changeTaskTitle = (todolistId: string, id: string, title: string) => {
        dispatchToTasks(changeTaskTitleAC(todolistId, id, title))
        // setTasks({
        //     ...tasks, [todolistId]: tasks[todolistId].map(
        //         task => task.id === id ? {...task, title} : task)
        // })
    }

    const changeTodolistFilter = (todolistId: string, filter: FilterValuesType) => {
        // setTodolists(
        //     todolists.map(todolist => todolist.id === todolistId ? {...todolist, filter} : todolist)
        // )
        dispatchToTodolists(changeTodolistFilterAC(todolistId, filter));
    }
    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatchToTodolists(changeTodolistTitleAC(todolistId, title));
        // setTodolists(
        //     todolists.map(todolist => todolist.id === todolistId ? {...todolist, title} : todolist)
        // )
    }
    const addTodolist = (title: string) => {
        const action = addTodolistAC(title);
        dispatchToTodolists(action)
        dispatchToTasks(action);
        // const todolistId = v1();
        // const todolist: TodolistType = {id: todolistId, title, filter: 'All'};
        // setTodolists(
        //     [...todolists, todolist]
        // )
        // setTasks({...tasks, [todolistId]: []})
    }

    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId);
        dispatchToTodolists(action)
        dispatchToTasks(action);
    }

    return (
        <div className="App">
            <div>
                <InputForm addTask={(value) => addTodolist(value)}/>
            </div>
            {
                todolists.map((todolist: TodolistType) => {

                    let filteredTasks = tasks[todolist.id];

                    if (todolist.filter === 'Active') {
                        filteredTasks = tasks[todolist.id].filter(task => !task.isDone);
                    }
                    if (todolist.filter === 'Completed') {
                        filteredTasks = tasks[todolist.id].filter(task => task.isDone);
                    }

                    return (
                        <Todolist key={todolist.id}
                                  todolistId={todolist.id}
                                  title={todolist.title}
                                  tasks={filteredTasks}
                                  filter={todolist.filter}
                                  addTask={addTask}
                                  removeTask={removeTask}
                                  changeTodolistFilter={changeTodolistFilter}
                                  changeTaskStatus={changeTaskStatus}
                                  changeTaskTitle={changeTaskTitle}
                                  changeTodolistTitle={changeTodolistTitle}
                                  removeTodolist={removeTodolist}/>)
                })
            }
        </div>
    );
}
