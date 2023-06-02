import React, {ChangeEvent, memo} from 'react';
import {EditableInput} from "./components/editable-input/EditableInput";
import {TaskResponseType, TaskStatuses} from "./types/types";
import {IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from '@mui/material/Checkbox';

type PropsType = {
    todolistId: string;
    task: TaskResponseType;
    removeTask: (todolistId: string, taskId: string) => void;
    onChangeCheckboxHandler: (todolistId: string, id: string, status: TaskStatuses) => void;
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void;
}
export const Task = memo((props: PropsType) => {

    const removeTask = () => {
        props.removeTask(props.todolistId, props.task.id);
    }
    const onChangeCheckboxHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.onChangeCheckboxHandler(props.todolistId, props.task.id,
            event.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New);
        console.log(event.currentTarget.checked)
    }
    const changeTaskTitle = (taskId: string, title: string) => {
        props.changeTaskTitle(props.todolistId, taskId, title);
    }

    return (
        <div className={props.task.status ? 'is-done' : ''}>
            {/*<button onClick={removeTask}>x</button>*/}
            <Checkbox onChange={onChangeCheckboxHandler}
                      color={'primary'}
                      checked={props.task.status === TaskStatuses.Completed}/>

            {/*<input type='checkbox'*/}
            {/*       checked={props.task.status === TaskStatuses.Completed}*/}
            {/*       onChange={onChangeCheckboxHandler}/>*/}
            <EditableInput value={props.task.title}
                           changeTitle={(value) => changeTaskTitle(props.task.id, value)}/>
            <IconButton aria-label="delete" onClick={removeTask}>
                <DeleteIcon/>
            </IconButton>
        </div>
    );
});
