import {Dispatch} from "redux";
import {LoginParamsType, todolistsAPI} from "../api/API";

const initialState: InitialStateType = {
    isLoggedIn: false,
}

export const authReducer = (state: InitialStateType = initialState, action: SetIsLoggedInActionType): InitialStateType => {
    switch (action.type) {
        case 'SET_IS_LOGGED_IN':
            return {...state, isLoggedIn: action.isLoggedIn}
        default:
            return {...state}
    }
}

export type InitialStateType = {
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    isLoggedIn: boolean,
}

export const setIsLoggedInAC = (isLoggedIn: boolean) => ({type: 'SET_IS_LOGGED_IN', isLoggedIn} as const)

export type SetIsLoggedInActionType = ReturnType<typeof setIsLoggedInAC>;

export const logInTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    todolistsAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true));
            }
        })
}
