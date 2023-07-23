const initialState: InitialStateType = {
    error: null,
    status: 'idle',
}

export const appReducer = (state: InitialStateType = initialState, action: AppReducerActionType): InitialStateType => {
    switch (action.type) {
        case 'SET-ERROR':
            return {...state, error: action.error}
        case 'SET_STATUS':
            return {...state, status: action.status}
        default:
            return {...state}
    }
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export type InitialStateType = {
    error: string | null,
    status: RequestStatusType,
}

export const setAppErrorAC = (error: string | null) => ({type: 'SET-ERROR', error} as const);
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'SET_STATUS', status} as const);


export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>;
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>;
type AppReducerActionType = SetAppErrorActionType | SetAppStatusActionType;
