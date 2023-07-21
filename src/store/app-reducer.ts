const initialState: InitialStateType = {
    error: null,
}

export const appReducer = (state: InitialStateType = initialState, action: SetAppErrorActionType): InitialStateType => {
    switch (action.type) {
        case 'SET-ERROR':
            return {...state, error: action.error}
        default:
            return {...state}
    }
}

export type InitialStateType = {
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
}

export const setAppErrorAC = (error: string | null) => ({type: 'SET-ERROR', error} as const)

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>;
