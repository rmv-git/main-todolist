import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import {TextField} from "@mui/material";

type PropsType = {
    value: string;
    changeTitle: (value: string) => void;
}

export const EditableInput = memo((props: PropsType) => {

    const [edit, setEdit] = useState<boolean>(false);
    const [value, setValue] = useState(props.value);
    const [error, setError] = useState<string | null>(null);


    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value);
    }

    const activateEdit = () => {
        setEdit(true);
    }

    const deactivateEdit = () => {
        if (value.trim() !== '') {
            props.changeTitle(value);
            setEdit(false);
        }
        if (value.trim() === '') {
            setError('Title is required!');
        }
        if (error !== null) {
            setError(null);
        }
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        const {key} = event;
        if (key === 'Enter') {
            deactivateEdit();
        }
    }

    return (
        <>
            {
                edit
                    ? <TextField variant={'outlined'}
                                 value={value}
                                 onChange={onChangeHandler}
                                 onBlur={deactivateEdit}
                                 autoFocus
                                 size={'small'}
                                 error={!!error}
                                 label={error}
                                 onKeyDown={onKeyPressHandler}
                    />
                    : <span onDoubleClick={activateEdit}>{props.value}</span>
            }
        </>
    );
});
