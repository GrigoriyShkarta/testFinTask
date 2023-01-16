import {ITicker} from "../../models/ITicker";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getTickers} from "./ActionCreators";
import exp from "constants";

interface TickersState {
    tickers: ITicker[];
    isLoading: boolean;
    error: string;
}

const initialState: TickersState = {
    tickers: [],
    isLoading: false,
    error: ''
}

export const tickersSlice = createSlice({
    name: 'tickers',
    initialState,
    reducers: {
        setTickers(state, action) {
            state.tickers = action.payload
        }
    },
    // extraReducers:{
    //     [getTickers.fulfilled.type]: (state, action: PayloadAction<ITicker[]>) => {
    //         state.isLoading = false;
    //         state.error = '';
    //         state.tickers = action.payload;
    //     },
    //     [getTickers.rejected.type]: (state) => {
    //         state.isLoading = true;
    //     },
    //     [getTickers.rejected.type]: (state, action: PayloadAction<string>) => {
    //         state.isLoading = false;
    //         state.error = action.payload;
    //     }
    // }
})

export default tickersSlice.reducer;