import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type TaskType = {
    id: number;
    title: string;
    isDone: boolean;
}
export const App = () => {

    const ArrayWhatToLearn = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false}
    ];
    const ArrayBooks = [
        {id: 1, title: '1984', isDone: true},
        {id: 2, title: 'The Financier', isDone: true},
        {id: 3, title: 'The Stoic', isDone: true},
        {id: 4, title: 'The Titan', isDone: true},
        {id: 5, title: 'The Double', isDone: true},
        {id: 6, title: 'The Master and Margarita', isDone: false},
    ];

    return (
        <div className="App">
            {/*<Todolist title={'What to learn'} tasks={ArrayWhatToLearn}/>*/}
            <Todolist title={'Books'} tasks={ArrayBooks}/>
        </div>
    );
}
