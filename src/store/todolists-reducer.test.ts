export {};
// import {
//     addTodolistAC,
//     changeTodolistFilterAC,
//     changeTodolistTitleAC,
//     removeTodolistAC,
//     todolistsReducer
// } from './todolists-reducer';
// import {v1} from 'uuid';
// import {TodolistType} from "../types";
//
// let todolistId1: string;
// let todolistId2: string;
// let startState: Array<TodolistType> = [];
//
// beforeEach(() => {
//
//     todolistId1 = v1();
//     todolistId2 = v1();
//
//     startState = [
//         {id: todolistId1, title: 'What to learn', filter: 'All'},
//         {id: todolistId2, title: 'What to buy', filter: 'All'},
//     ]
// });
//
// test('correct todolist should be removed', () => {
//
//     const endState = todolistsReducer(startState, removeTodolistAC(todolistId1));
//
//     expect(endState.length).toBe(1);
//     expect(endState[0].id).toBe(todolistId2);
//     expect(endState[0].title).toBe('What to buy');
// });
//
// test('correct todolist should be added', () => {
//
//     const endState = todolistsReducer(startState, addTodolistAC('new todolist'))
//
//     expect(endState.length).toBe(3);
//     expect(endState[0].title).toBe('What to learn');
//     expect(endState[1].title).toBe('What to buy');
//     expect(endState[2].title).toBe('new todolist');
// });
//
// test('correct todolist should change its name', () => {
//
//     const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, 'new title'));
//
//     expect(endState.length).toBe(2);
//     expect(endState[0].title).toBe('What to learn');
//     expect(endState[1].title).toBe('new title');
// });
//
// test('correct filter of todolist should be changed', () => {
//
//     const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2, 'Active'));
//
//     expect(endState.length).toBe(2);
//     expect(endState[0].title).toBe('What to learn');
//     expect(endState[1].title).toBe('What to buy');
//     expect(endState[0].filter).toBe('All');
//     expect(endState[1].filter).toBe('Active');
// });
