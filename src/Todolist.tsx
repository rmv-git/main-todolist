import React, {memo, useCallback, useEffect} from "react";
// import {FilterValuesType, TaskType} from "./types";
import {InputForm} from "./components/input-form/InputForm";
import {EditableInput} from "./components/editable-input/EditableInput";
import {Task} from "./Task";
import {FilterValuesType, TaskResponseType, TaskStatuses} from "./types/types";
import {useDispatch} from "react-redux";
import {getTasksThunk} from "./store/tasks-reducer";
import {useAppDispatch} from "./store/redux-store";

type PropsType = {
    todolistId: string,
    title: string;
    tasks: Array<TaskResponseType>;
    filter: FilterValuesType;
    addTask: (todolistId: string, title: string) => void;
    removeTask: (todolistId: string, id: string) => void;
    changeTodolistFilter: (todolistId: string, filter: FilterValuesType) => void;
    changeTaskStatus: (todolistId: string, id: string, status: TaskStatuses) => void;
    changeTaskTitle: (todolistId: string, id: string, title: string) => void;
    changeTodolistTitle: (todolistId: string, title: string) => void;
    removeTodolist: (todolistId: string) => void;
}
export const Todolist = memo((props: PropsType) => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTasksThunk(props.todolistId))
    }, []);

    const addTask = useCallback((value: string) => {
        props.addTask(props.todolistId, value)
    }, [props.addTask, props.todolistId])

    const onClickFilterHandler = useCallback((filter: FilterValuesType) => {
        props.changeTodolistFilter(props.todolistId, filter);
    }, [props.changeTodolistFilter, props.todolistId])

    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.todolistId, title);
    }, [props.changeTodolistTitle, props.todolistId])

    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.todolistId);
    }, [props.removeTodolist, props.todolistId])

    let filteredTasks = props.tasks;

    if (props.filter === 'Active') {
        filteredTasks = props.tasks.filter(task => task.status === TaskStatuses.New );
    }
    if (props.filter === 'Completed') {
        filteredTasks = props.tasks.filter(task => task.status === TaskStatuses.Completed);
    }

    return (
        <div>
            <h3>
                <EditableInput value={props.title} changeTitle={changeTodolistTitle}/>
                <button onClick={removeTodolist}>x</button>
            </h3>
            <InputForm addTask={addTask}/>
            <ul style={{listStyle: "none"}}>
                {
                    filteredTasks.map((task: TaskResponseType) => <Task todolistId={props.todolistId}
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
})
