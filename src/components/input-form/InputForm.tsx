import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import styles from './InputForm.module.css';
import {IconButton, Stack, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";

type PropsType = {
    addTask: (value: string) => void;
}
export const InputForm = memo((props: PropsType) => {

    const [value, setValue] = useState('');
    const [error, setError] = useState<string | null>(null);

    const addTask = () => {
        if (value.trim() !== '') {
            props.addTask(value);
            setValue('');
        }
        if (value.trim() === '') {
            setError('Title is required!');
        }
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value);
    }

    const onClickHandler = () => {
        if (error !== null) {
            setError(null);
        }
        addTask();
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        const {key} = event;
        if (key === 'Enter') {
            onClickHandler();
        }
    }

    return (
        <Stack direction={'row'} className={styles.wrapper}>
            <TextField variant={'outlined'}
                       value={value}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyPressHandler}
                       size={'small'}
                       error={!!error}
                       label={error}
            />
            <IconButton color={'primary'} onClick={onClickHandler}>
                <AddBox/>
            </IconButton>
        </Stack>
    );
});
