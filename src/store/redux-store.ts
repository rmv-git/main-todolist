import {combineReducers, createStore} from "redux";
import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";

const rootReducer = combineReducers({
    todolistsReducer,
    tasksReducer,
});

export const reduxStore = createStore(rootReducer);

export type RootStateType = ReturnType<typeof reduxStore.getState>

export type AppDispatch = typeof reduxStore.dispatch;

//@ts-ignore
window.store = reduxStore;
