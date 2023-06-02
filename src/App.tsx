import React, {memo, useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {InputForm} from "./components/input-form/InputForm";
import {
    changeTodolistFilterAC,
    changeTodolistTitleThunk,
    createTodolistThunk,
    getTodolistsThunk,
    removeTodolistThunk
} from "./store/todolists-reducer";
import {changeTaskStatusTC, changeTaskTitleTC, createTaskTC, removeTaskTC} from "./store/tasks-reducer";
import {useSelector} from "react-redux";
import {RootStateType, useAppDispatch} from "./store/redux-store";
import {FilterValuesType, TaskStatuses, TasksType, TodolistDomainType} from "./types/types";
import MenuAppBar from "./components/material-ui-components/MenuAppBar";
import {Container, Grid, Paper} from "@mui/material";

export const App = memo(() => {

    const todolists = useSelector<RootStateType, Array<TodolistDomainType>>(
        state => state.todolistsReducer);
    const tasks = useSelector<RootStateType, TasksType>(
        state => state.tasksReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTodolistsThunk())
    }, []);

    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(createTaskTC(todolistId, title));
    }, []);
    const removeTask = useCallback((todolistId: string, id: string) => {
        dispatch(removeTaskTC(todolistId, id));
    }, []);
    const changeTaskStatus = useCallback((todolistId: string, id: string, status: TaskStatuses) => {
        dispatch(changeTaskStatusTC(todolistId, id, {status}));
    }, []);
    const changeTaskTitle = useCallback((todolistId: string, id: string, title: string) => {
        dispatch(changeTaskTitleTC(todolistId, id, {title}));
    }, []);
    const changeTodolistFilter = useCallback((todolistId: string, filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todolistId, filter));
    }, []);
    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(changeTodolistTitleThunk(todolistId, title));
    }, []);
    const addTodolist = useCallback((title: string) => {
        dispatch(createTodolistThunk(title));
    }, []);
    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistThunk(todolistId));
    }, []);

    return (
        <div className="App">
            <MenuAppBar/>
            <Container fixed style={{padding: 0, margin: 0}}>
                <Grid container style={{padding: '20px'}}>
                    <InputForm addTask={(value) => addTodolist(value)}/>
                </Grid>
                <Grid container spacing={2}>
                    {
                        todolists.map((todolist) => {

                            let allTasks = tasks[todolist.id];

                            return (
                                <Grid item>
                                    <Paper style={{padding: '10px'}}>
                                        <Todolist key={todolist.id}
                                                  todolistId={todolist.id}
                                                  title={todolist.title}
                                                  tasks={allTasks}
                                                  filter={todolist.filter}
                                                  addTask={addTask}
                                                  removeTask={removeTask}
                                                  changeTodolistFilter={changeTodolistFilter}
                                                  changeTaskStatus={changeTaskStatus}
                                                  changeTaskTitle={changeTaskTitle}
                                                  changeTodolistTitle={changeTodolistTitle}
                                                  removeTodolist={removeTodolist}/>
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
})
