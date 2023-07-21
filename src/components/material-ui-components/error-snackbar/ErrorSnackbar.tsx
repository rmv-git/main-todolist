import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AlertProps, Snackbar} from '@mui/material'
import MuiAlert from '@mui/material/Alert';
import {RootStateType} from "../../../store/redux-store";
import {setAppErrorAC} from "../../../store/app-reducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ErrorSnackbar() {

    const error = useSelector<RootStateType, string | null>(state => state.appReducer.error);
    const dispatch = useDispatch()

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(setAppErrorAC(null));
    }

    const isOpen = error !== null;

    return (
        <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                {error}
            </Alert>
        </Snackbar>
    )
}
