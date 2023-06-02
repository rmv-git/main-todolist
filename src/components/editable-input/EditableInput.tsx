import React, {ChangeEvent, memo, useState} from 'react';
import {TextField} from "@mui/material";

type PropsType = {
    value: string;
    changeTitle: (value: string) => void;
}

export const EditableInput = memo((props: PropsType) => {

    const [edit, setEdit] = useState<boolean>(false);
    const [value, setValue] = useState(props.value);

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value);
    }

    const activateEdit = () => {
        setEdit(true);
    }

    const deactivateEdit = () => {
        props.changeTitle(value);
        setEdit(false);
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
                    />
                    // ? <input value={value}
                    //          onChange={onChangeHandler}
                    //          onBlur={deactivateEdit}
                    //          autoFocus/>
                    : <span onDoubleClick={activateEdit}>{props.value}</span>
            }
        </>
    );
});
