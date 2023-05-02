import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type PropsType = {
    addTask: (value: string) => void;
}
export const InputForm = (props: PropsType) => {

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
        <div>
            <input type={'text'}
                   value={value}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyPressHandler}
            />
            <button onClick={onClickHandler}>+</button>
        </div>
    );
};
