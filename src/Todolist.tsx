import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValuesType, TaskType} from "./types";
import {InputForm} from "./components/input-form/InputForm";
import {EditableInput} from "./components/editable-input/EditableInput";

type PropsType = {
    title: string;
    tasks: Array<TaskType>;
    addTask: (title: string) => void;
    removeTask: (id: string) => void;
    setTaskFilter: (value: FilterValuesType) => void;
    changeTaskStatus: (id: string, isDone: boolean) => void;
    changeTaskTitle: (id: string, title: string) => void;
}
export const Todolist = (props: PropsType) => {

    // let [taskTitle, setTaskTitle] = useState<string>('');

    // const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    //     setTaskTitle(event.currentTarget.value);
    // }

    const addTask = (value: string) => {
        props.addTask(value)
    }

    // const onKeyPressHandler = (event: KeyboardEvent) => {
    //     const {key} = event;
    //     if (key === 'Enter') {
    //         // addTask();
    //     }
    // }

    const onClickFilterHandler = (value: FilterValuesType) => {
        props.setTaskFilter(value);
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <InputForm addTask={(value) => addTask(value)}/>
            {/*<div>*/}
            {/*    <input value={taskTitle} onChange={onChangeHandler} onKeyDown={onKeyPressHandler}/>*/}
            {/*    <button onClick={addTask}>+</button>*/}
            {/*</div>*/}
            <ul style={{listStyle: "none"}}>
                {
                    props.tasks.map((task: TaskType) => {
                        const onChangeCheckboxHandler = (isDone: boolean) => {
                            props.changeTaskStatus(task.id, isDone)
                        }
                        const changeTaskTitle = (title: string) => {
                            props.changeTaskTitle(task.id, title);
                        }

                        return (
                            <li key={task.id}>
                                <button onClick={() => props.removeTask(task.id)}>x</button>
                                <input type='checkbox' checked={task.isDone}
                                       onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                           onChangeCheckboxHandler(event.currentTarget.checked)}
                                />
                                <EditableInput title={task.title} changeTitle={changeTaskTitle}/>
                                {/*<span>{task.title}</span>*/}
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button onClick={() => onClickFilterHandler('All')}>All
                </button>
                <button onClick={() => onClickFilterHandler('Active')}>Active
                </button>
                <button onClick={() => onClickFilterHandler('Completed')}>Completed
                </button>
            </div>
        </div>
    );
}
