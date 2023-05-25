import React, {ChangeEvent, memo} from 'react';
import {EditableInput} from "./components/editable-input/EditableInput";
import {TaskType} from "./types";

type PropsType = {
    todolistId: string;
    task: TaskType;
    removeTask: (todolistId: string, taskId: string) => void;
    onChangeCheckboxHandler: (todolistId: string, id: string, isDone: boolean) => void;
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void;
}
export const Task = memo((props: PropsType) => {

    const removeTask = () => {
        props.removeTask(props.todolistId, props.task.id);
    }
    const onChangeCheckboxHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.onChangeCheckboxHandler(props.todolistId, props.task.id, event.currentTarget.checked);
    }
    const changeTaskTitle = (taskId: string, title: string) => {
        props.changeTaskTitle(props.todolistId, taskId, title);
    }

    return (
        <li className={props.task.isDone ? 'is-done' : ''}>
            <button onClick={removeTask}>x</button>
            <input type='checkbox'
                   checked={props.task.isDone}
                   onChange={onChangeCheckboxHandler}/>
            <EditableInput title={props.task.title}
                           changeTitle={(value) => changeTaskTitle(props.task.id, value)}/>
        </li>
    );
});
