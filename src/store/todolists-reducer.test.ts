import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {TodolistType} from "../types";

test('correct todolist should be removed', () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'},
    ];

    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
    expect(endState[0].title).toBe('What to buy');
});

test('correct todolist should be added', () => {

    let todolistId1 = v1();
    let todolistId2 = v1();


    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: 'All'},
        {id: todolistId2, title: "What to buy", filter: 'All'},
    ];

    const endState = todolistsReducer(startState, addTodolistAC('new todolist'))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe('What to buy');
    expect(endState[2].title).toBe('new todolist');
});

test('correct todolist should change its name', () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'},
    ];

    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, 'new title'));

    expect(endState.length).toBe(2);
    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe('new title');
});

test('correct filter of todolist should be changed', () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'},
    ];

    const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2, 'Active'));

    expect(endState.length).toBe(2);
    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe('What to buy');
    expect(endState[0].filter).toBe('All');
    expect(endState[1].filter).toBe('Active');
});
