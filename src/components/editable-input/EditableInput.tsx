import React, {ChangeEvent, memo, useState} from 'react';

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
                    ? <input value={value}
                             onChange={onChangeHandler}
                             onBlur={deactivateEdit}
                             autoFocus/>
                    : <span onDoubleClick={activateEdit}>{props.value}</span>
            }
        </>
    );
});
