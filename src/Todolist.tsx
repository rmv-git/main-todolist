import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValuesType, TaskType} from "./types";

type PropsType = {
    title: string;
    tasks: Array<TaskType>;
    addTask: (title: string) => void;
    removeTask: (id: number) => void;
    setTaskFilter: (value: FilterValuesType) => void;
}
export const Todolist = (props: PropsType) => {

    let [taskTitle, setTaskTitle] = useState<string>('');

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value);
    }

    const addTask = () => {
        if (taskTitle.trim() !== '') {
            props.addTask(taskTitle);
            setTaskTitle('');
        }
    }

    const onKeyPressHandler = (event: KeyboardEvent) => {
        const {key} = event;
        if (key === 'Enter') {
            addTask();
        }
    }

    const onClickFilterHandler = (value: FilterValuesType) => {
        props.setTaskFilter(value);
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={taskTitle} onChange={onChangeHandler} onKeyDown={onKeyPressHandler}/>
                <button onClick={addTask}>+</button>
            </div>
            <ul style={{listStyle: "none"}}>
                {
                    props.tasks.map((task: TaskType) => {
                        return (
                            <li key={task.id}>
                                <button onClick={() => props.removeTask(task.id)}>x</button>
                                <input type='checkbox' checked={task.isDone}/>
                                <span>{task.title}</span>
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
