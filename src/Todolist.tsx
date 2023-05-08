import React from "react";
import {FilterValuesType, TaskType} from "./types";
import {InputForm} from "./components/input-form/InputForm";
import {EditableInput} from "./components/editable-input/EditableInput";
import {Task} from "./Task";

type PropsType = {
    todolistId: string,
    title: string;
    tasks: Array<TaskType>;
    filter: FilterValuesType;
    addTask: (todolistId: string, title: string) => void;
    removeTask: (todolistId: string, id: string) => void;
    changeTodolistFilter: (todolistId: string, filter: FilterValuesType) => void;
    changeTaskStatus: (todolistId: string, id: string, isDone: boolean) => void;
    changeTaskTitle: (todolistId: string, id: string, title: string) => void;
    changeTodolistTitle: (todolistId: string, title: string) => void;
    removeTodolist: (todolistId: string) => void;
}
export const Todolist = (props: PropsType) => {

    const addTask = (value: string) => {
        props.addTask(props.todolistId, value)
    }

    const onClickFilterHandler = (filter: FilterValuesType) => {
        props.changeTodolistFilter(props.todolistId, filter);
    }

    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.todolistId, title);
    }
    const removeTodolist = () => {
        props.removeTodolist(props.todolistId);
    }

    let filteredTasks = props.tasks;

    if (props.filter === 'Active') {
        filteredTasks = props.tasks.filter(task => !task.isDone);
    }
    if (props.filter === 'Completed') {
        filteredTasks = props.tasks.filter(task => task.isDone);
    }

    return (
        <div>
            <h3>
                <EditableInput title={props.title} changeTitle={changeTodolistTitle}/>
                <button onClick={removeTodolist}>x</button>
            </h3>
            <InputForm addTask={addTask}/>
            <ul style={{listStyle: "none"}}>
                {
                    filteredTasks.map((task: TaskType) => <Task todolistId={props.todolistId}
                                                              key={task.id}
                                                              task={task}
                                                              changeTaskTitle={props.changeTaskTitle}
                                                              removeTask={props.removeTask}
                                                              onChangeCheckboxHandler={props.changeTaskStatus}/>)
                }
            </ul>
            <div>
                <button className={props.filter === 'All' ? 'active-filter' : ''}
                        onClick={() => onClickFilterHandler('All')}>All
                </button>
                <button className={props.filter === 'Active' ? 'active-filter' : ''}
                        onClick={() => onClickFilterHandler('Active')}>Active
                </button>
                <button className={props.filter === 'Completed' ? 'active-filter' : ''}
                        onClick={() => onClickFilterHandler('Completed')}>Completed
                </button>
            </div>
        </div>
    );
}
