import React, {memo} from 'react';
import './App.css';
import MenuAppBar from "../components/material-ui-components/MenuAppBar";
import {TodolistsList} from "../features/todolists/TodolistsList";
import Container from '@mui/material/Container/Container';
import {ErrorSnackbar} from "../components/material-ui-components/error-snackbar/ErrorSnackbar";

export const App = memo(() => {
    return (
        <div className="App">
            <MenuAppBar/>
            <Container fixed style={{padding: 0, margin: 0}}>
                <TodolistsList/>
            </Container>
            <ErrorSnackbar/>
        </div>
    );
});
