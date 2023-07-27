import React, {memo, useCallback, useEffect} from "react";
import {InputForm} from "../../components/input-form/InputForm";
import {EditableInput} from "../../components/editable-input/EditableInput";
import {Task} from "./task/Task";
import {FilterValuesType, RequestStatusType, TaskResponseType, TaskStatuses} from "../../types/types";
import {getTasksThunk} from "../../store/tasks-reducer";
import {useAppDispatch} from "../../store/redux-store";
import {Button, IconButton, Stack} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

type PropsType = {
    todolistId: string,
    entityStatus: RequestStatusType;
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
export const Todolist: React.FC<PropsType> = memo((props) => {

    const {
        todolistId,
        addTask,
        changeTodolistFilter,
        changeTodolistTitle,
        removeTodolist,
    } = props;

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTasksThunk(todolistId))
    },[dispatch, todolistId]);

    const addTaskCallback = useCallback((value: string) => {
        addTask(todolistId, value)
    }, [addTask, todolistId])

    const onClickFilterHandler = useCallback((filter: FilterValuesType) => {
        changeTodolistFilter(todolistId, filter);
    }, [changeTodolistFilter, todolistId])

    const changeTodolistTitleCallback = useCallback((title: string) => {
        changeTodolistTitle(todolistId, title);
    }, [changeTodolistTitle, todolistId])

    const removeTodolistCallback = useCallback(() => {
        removeTodolist(todolistId)
    }, [removeTodolist, todolistId])

    let filteredTasks = props.tasks;

    if (props.filter === 'Active') {
        filteredTasks = props.tasks.filter(task => task.status === TaskStatuses.New);
    }
    if (props.filter === 'Completed') {
        filteredTasks = props.tasks.filter(task => task.status === TaskStatuses.Completed);
    }

    return (
        <div>
            <h3 style={{margin: 0}}>
                <EditableInput value={props.title} changeTitle={changeTodolistTitleCallback}/>
                <IconButton aria-label="delete" onClick={removeTodolistCallback}
                            disabled={props.entityStatus === 'loading'}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <InputForm addTask={addTaskCallback} entityStatus={props.entityStatus}/>
            <Stack direction={'column'} style={{listStyle: "none"}}>
                {
                    filteredTasks.map((task: TaskResponseType) => {
                        return (
                            <Task todolistId={todolistId}
                                  key={task.id}
                                  task={task}
                                  changeTaskTitle={props.changeTaskTitle}
                                  removeTask={props.removeTask}
                                  onChangeCheckboxHandler={props.changeTaskStatus}/>)
                    })
                }
            </Stack>
            <Stack spacing={0.5} direction="row">
                <Button variant={props.filter === 'All' ? 'contained' : 'outlined'}
                        onClick={() => onClickFilterHandler('All')}>All</Button>
                <Button variant={props.filter === 'Active' ? 'contained' : 'outlined'}
                        onClick={() => onClickFilterHandler('Active')}>Active</Button>
                <Button variant={props.filter === 'Completed' ? 'contained' : 'outlined'}
                        onClick={() => onClickFilterHandler('Completed')}>Completed</Button>
            </Stack>
        </div>
    );
})
