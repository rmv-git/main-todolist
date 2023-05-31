import {addTaskAC, changeTaskStatusAC, removeTaskAC, tasksReducer} from './tasks-reducer';
import {addTodolistAC, removeTodolistAC, todolistsReducer} from "./todolists-reducer";
import {v1} from "uuid";
import {
    TaskPriorities,
    TaskStatuses,
    TasksType,
    TodolistDomainType,
    TodolistResponseType,
    UpdateTaskModelType
} from "../types/types";

let todolistId1: string;
let todolistId2: string;
let startState: TasksType = {};

beforeEach(() => {

    todolistId1 = v1();
    todolistId2 = v1();

    startState = {
        [todolistId1]: [
            {
                id: '1',
                title: 'CSS',
                addedDate: '',
                completed: false,
                startDate: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                deadline: '',
                description: '',
                order: 0,
                todoListId: todolistId1,
            },
            {
                id: '2',
                title: 'JS',
                addedDate: '',
                completed: false,
                startDate: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                deadline: '',
                description: '',
                order: 0,
                todoListId: todolistId1,
            },
            {
                id: '3',
                title: 'React',
                addedDate: '',
                completed: false,
                startDate: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                deadline: '',
                description: '',
                order: 0,
                todoListId: todolistId1,
            },
        ],
        [todolistId2]: [
            {
                id: '1',
                title: 'Bread',
                addedDate: '',
                completed: false,
                startDate: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                deadline: '',
                description: '',
                order: 0,
                todoListId: todolistId2,
            },
            {
                id: '2',
                title: 'Milk',
                addedDate: '',
                completed: false,
                startDate: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                deadline: '',
                description: '',
                order: 0,
                todoListId: todolistId2,
            },
            {
                id: '3',
                title: 'Butter',
                addedDate: '',
                completed: false,
                startDate: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                deadline: '',
                description: '',
                order: 0,
                todoListId: todolistId2,
            },
        ],
    }
});

test('correct task should be deleted from correct array', () => {

    const endState = tasksReducer(startState, removeTaskAC(todolistId2, '3'));

    expect(endState).toEqual({
        [todolistId1]: [
            {
                id: '1',
                title: 'CSS',
                addedDate: '',
                completed: false,
                startDate: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                deadline: '',
                description: '',
                order: 0,
                todoListId: todolistId1,
            },
            {
                id: '2',
                title: 'JS',
                addedDate: '',
                completed: false,
                startDate: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                deadline: '',
                description: '',
                order: 0,
                todoListId: todolistId1,
            },
            {
                id: '3',
                title: 'React',
                addedDate: '',
                completed: false,
                startDate: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                deadline: '',
                description: '',
                order: 0,
                todoListId: todolistId1,
            },
        ],
        [todolistId2]: [
            {
                id: '1',
                title: 'Bread',
                addedDate: '',
                completed: false,
                startDate: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                deadline: '',
                description: '',
                order: 0,
                todoListId: todolistId2,
            },
            {
                id: '2',
                title: 'Milk',
                addedDate: '',
                completed: false,
                startDate: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                deadline: '',
                description: '',
                order: 0,
                todoListId: todolistId2,
            },
        ],
    });
});

test('correct task should be added to correct array', () => {

    const endState = tasksReducer(startState, addTaskAC(todolistId2, 'new task'));

    expect(endState[todolistId1].length).toBe(3);
    expect(endState[todolistId2].length).toBe(4);
    expect(endState[todolistId2][3].id).toBeDefined();
    expect(endState[todolistId2][3].title).toBe('new task');
    expect(endState[todolistId2][3].status).toBe(TaskStatuses.New);
});

test('status of specified task should be changed', () => {

    const updateModel: UpdateTaskModelType = {
        title: '',
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        deadline: '',
        startDate: '',
        description: '',
    }

    const endState = tasksReducer(startState, changeTaskStatusAC(todolistId2, '2', updateModel));

    expect(endState[todolistId2][1].status).toBe(TaskStatuses.New);
    expect(endState[todolistId2][1].title).toBe('Milk');
    expect(endState[todolistId2][1].id).toBe('2');
    expect(endState[todolistId2].length).toBe(3);
});

test('new array should be added when new todolist is added', () => {

    const todolist: TodolistResponseType = {
        id: v1(),
        title: 'zxzxzx',
        addedDate: '',
        order: 0
    }

    const endState = tasksReducer(startState, addTodolistAC(todolist));


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== todolistId1 && k !== todolistId2);
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('ids should be equals', () => {
    const startTasksState: TasksType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];

    const todolist: TodolistResponseType = {
        id: v1(),
        title: 'zxzxzx',
        addedDate: '',
        order: 0
    }

    const action = addTodolistAC(todolist);

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolistId);
    expect(idFromTodolists).toBe(action.todolistId);
});

test('property with todolistId should be deleted', () => {

    const endState = tasksReducer(startState, removeTodolistAC(todolistId2));

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState[todolistId2]).not.toBeDefined();
});
