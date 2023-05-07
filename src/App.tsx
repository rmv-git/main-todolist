import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {FilterValuesType, TasksType, TodolistType} from "./types";
import {InputForm} from "./components/input-form/InputForm";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "./store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "./store/redux-store";

export const App = () => {

    const todolists = useSelector<RootStateType, Array<TodolistType>>(
        state => state.todolistsReducer);
    const tasks = useSelector<RootStateType, TasksType>(
        state => state.tasksReducer);
    const dispatch = useDispatch();

    const addTask = (todolistId: string, title: string) => {
        dispatch(addTaskAC(todolistId, title));
    }
    const removeTask = (todolistId: string, id: string) => {
        dispatch(removeTaskAC(todolistId, id));
    }
    const changeTaskStatus = (todolistId: string, id: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistId, id, isDone));
    }
    const changeTaskTitle = (todolistId: string, id: string, title: string) => {
        dispatch(changeTaskTitleAC(todolistId, id, title));
    }

    const changeTodolistFilter = (todolistId: string, filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todolistId, filter));
    }
    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title));
    }
    const addTodolist = (title: string) => {
        dispatch(addTodolistAC(title));
    }

    const removeTodolist = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId));
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
