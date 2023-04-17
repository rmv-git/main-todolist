import React from "react";
import {FilterValuesType, TaskType} from "./App";

type PropsType = {
    title: string;
    tasks: Array<TaskType>;
    removeTask: (id: number) => void;
    taskFilter: FilterValuesType;
    setTaskFilter: (value: FilterValuesType) => void;
}
export const Todolist = (props: PropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
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
                <button onClick={() => {props.setTaskFilter('All')}}>All</button>
                <button onClick={() => {props.setTaskFilter('Active')}}>Active</button>
                <button onClick={() => {props.setTaskFilter('Completed')}}>Completed</button>
            </div>
        </div>
    );
}
