import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import {useSelector} from "react-redux";
import {RootStateType} from "../../store/redux-store";

export function LinearProgressBar() {

    const isShow = useSelector<RootStateType, string>(state => state.appReducer.status);

    return (
        <Box sx={{width: '100%'}}>
            {
                isShow === 'loading' && <LinearProgress/>
            }
        </Box>
    );
}
