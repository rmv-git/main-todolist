import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import styles from './InputForm.module.css';
import {IconButton, Stack, TextField} from "@mui/material";
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
        <Stack className={styles.wrapper}>
            <TextField variant={'outlined'}
                       value={value}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyPressHandler}
                       size={'small'}
                       style={{padding: '10px'}}
            />
            <IconButton color={'primary'} onClick={onClickHandler}>
                <AddBox/>
            </IconButton>
        </Stack>
    );
});
