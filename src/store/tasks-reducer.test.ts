import {addTaskAC, changeTaskStatusAC, removeTaskAC, tasksReducer} from './tasks-reducer';
import {TasksType, TodolistType} from "../types";
import {addTodolistAC, removeTodolistAC, todolistsReducer} from "./todolists-reducer";

test('correct task should be deleted from correct array', () => {
    const startState: TasksType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
        ],
        'todolistId2': [
            {id: '1', title: 'Bread', isDone: false},
            {id: '2', title: 'Milk', isDone: true},
            {id: '3', title: 'Butter', isDone: false},
        ],
    };

    const endState = tasksReducer(startState, removeTaskAC('todolistId2', '3'));

    expect(endState).toEqual({
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
        ],
        'todolistId2': [
            {id: '1', title: 'Bread', isDone: false},
            {id: '2', title: 'Milk', isDone: true},
        ],
    });
});

test('correct task should be added to correct array', () => {
    const startState: TasksType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
        ],
        'todolistId2': [
            {id: '1', title: 'Bread', isDone: false},
            {id: '2', title: 'Milk', isDone: true},
            {id: '3', title: 'Butter', isDone: false},
        ],
    };

    const endState = tasksReducer(startState, addTaskAC('todolistId2', 'new task'));

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(4);
    expect(endState['todolistId2'][3].id).toBeDefined();
    expect(endState['todolistId2'][3].title).toBe('new task');
    expect(endState['todolistId2'][3].isDone).toBe(false);
});

test('status of specified task should be changed', () => {
    const startState: TasksType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
        ],
        'todolistId2': [
            {id: '1', title: 'Bread', isDone: false},
            {id: '2', title: 'Milk', isDone: true},
            {id: '3', title: 'Butter', isDone: false},
        ],
    };


    const endState = tasksReducer(startState, changeTaskStatusAC('todolistId2', '2', false));

    expect(endState['todolistId2'][1].isDone).toBeFalsy();
    expect(endState['todolistId2'][1].title).toBe('Milk');
    expect(endState['todolistId2'][1].id).toBe('2');
    expect(endState['todolistId2'].length).toBe(3);
});

test('new array should be added when new todolist is added', () => {
    const startState: TasksType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
        ],
        'todolistId2': [
            {id: '1', title: 'Bread', isDone: false},
            {id: '2', title: 'Milk', isDone: true},
            {id: '3', title: 'Butter', isDone: false},
        ],
    };

    const endState = tasksReducer(startState, addTodolistAC('new todolist'));


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2');
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('ids should be equals', () => {
    const startTasksState: TasksType = {};
    const startTodolistsState: Array<TodolistType> = [];

    const action = addTodolistAC('new todolist');

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolistId);
    expect(idFromTodolists).toBe(action.todolistId);
});


test('property with todolistId should be deleted', () => {
    const startState: TasksType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
        ],
        'todolistId2': [
            {id: '1', title: 'Bread', isDone: false},
            {id: '2', title: 'Milk', isDone: true},
            {id: '3', title: 'Butter', isDone: false},
        ],
    };

    const endState = tasksReducer(startState, removeTodolistAC('todolistId2'))

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState['todolistId2']).not.toBeDefined();
});
