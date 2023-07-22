import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import thunk from "redux-thunk";
import {useDispatch} from "react-redux";
import {appReducer} from "./app-reducer";
import {authReducer} from "./auth-reducer";

const rootReducer = combineReducers({
    todolistsReducer,
    tasksReducer,
    appReducer,
    authReducer,
});

export const reduxStore = createStore(rootReducer, applyMiddleware(thunk));

export type RootStateType = ReturnType<typeof reduxStore.getState>

export type AppDispatch = typeof reduxStore.dispatch | any;
export const useAppDispatch: () => AppDispatch = useDispatch
//@ts-ignore
window.store = reduxStore;
