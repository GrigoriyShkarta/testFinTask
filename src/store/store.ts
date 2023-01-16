import {combineReducers, configureStore} from "@reduxjs/toolkit";
import tickersReducer from "./reducers/TickersSlice";

const rootReducer = combineReducers({
    tickersReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']