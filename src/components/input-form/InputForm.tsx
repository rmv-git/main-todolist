import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import {Button, IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";

type PropsType = {
    addTask: (value: string) => void;
}
export const InputForm = memo((props: PropsType) => {

    const [value, setValue] = useState('');

    const addTask = () => {
        if (value.trim() !== '') {
            props.addTask(value);
            setValue('');
        }
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value);
    }

    const onClickHandler = () => {
        addTask();
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        const {key} = event;
        if (key === 'Enter') {
            onClickHandler();
        }
    }

    return (
        <div style={{padding: 0, margin: 0, display: 'flex', flexFlow: 'row', alignItems: 'center'}}>
            <TextField variant={'outlined'}
                       value={value}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyPressHandler}
                       size={'small'}
                       style={{padding: '10px'}}
            />
            {/*<input type={'text'}*/}
            {/*       value={value}*/}
            {/*       onChange={onChangeHandler}*/}
            {/*       onKeyDown={onKeyPressHandler}*/}
            {/*/>*/}
            {/*<Button variant={'outlined'} onClick={onClickHandler} style={{width: '32px', height: '32px'}}>+</Button>*/}
            <IconButton color={'primary'} onClick={onClickHandler} >
                <AddBox/>
            </IconButton>
            {/*<button onClick={onClickHandler}>+</button>*/}
        </div>
    );
});
