import React, {ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./types";
import {InputForm} from "./components/input-form/InputForm";
import {EditableInput} from "./components/editable-input/EditableInput";

type PropsType = {
    todolistId: string,
    title: string;
    tasks: Array<TaskType>;
    // filter: FilterValuesType;
    addTask: (todolistId: string, title: string) => void;
    removeTask: (todolistId: string, id: string) => void;
    // setTaskFilter: (filter: FilterValuesType) => void;
    changeTodolistFilter: (todolistId: string, filter: FilterValuesType) => void;
    changeTaskStatus: (todolistId: string, id: string, isDone: boolean) => void;
    changeTaskTitle: (todolistId: string, id: string, title: string) => void;
}
export const Todolist = (props: PropsType) => {

    const addTask = (value: string) => {
        props.addTask(props.todolistId, value)
    }

    const onClickFilterHandler = (filter: FilterValuesType) => {
        props.changeTodolistFilter(props.todolistId, filter);
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <InputForm addTask={(value) => addTask(value)}/>
            <ul style={{listStyle: "none"}}>
                {
                    props.tasks.map((task: TaskType) => {
                        const onChangeCheckboxHandler = (isDone: boolean) => {
                            props.changeTaskStatus(props.todolistId, task.id, isDone)
                        }
                        const changeTaskTitle = (title: string) => {
                            props.changeTaskTitle(props.todolistId, task.id, title);
                        }

                        // let filteredTasks
                        //
                        // if (props.filter === 'Active') {
                        //     filteredTasks = props.tasks.filter(task => !task.isDone);
                        // }
                        // if (props.filter === 'Completed') {
                        //     filteredTasks = props.tasks.filter(task => task.isDone);
                        // }

                        return (
                            <li key={task.id}>
                                <button onClick={() => props.removeTask(props.todolistId, task.id)}>x</button>
                                <input type='checkbox' checked={task.isDone}
                                       onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                           onChangeCheckboxHandler(event.currentTarget.checked)}
                                />
                                <EditableInput title={task.title} changeTitle={changeTaskTitle}/>
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
