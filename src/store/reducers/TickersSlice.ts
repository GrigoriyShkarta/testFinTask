import {ITicker} from "../../models/ITicker";
import {createSlice} from "@reduxjs/toolkit";

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
            console.log(action.payload)
            if (state.tickers.length) {
                state.tickers = state.tickers.map( ticker => {
                    const newTicker = action.payload?.find((t:ITicker) => t.ticker === ticker.ticker);
                    if (newTicker) {
                        return {
                            ...newTicker,
                            hidden: ticker.hidden
                        }
                    }
                    return ticker;
                });
            } else {
                state.tickers = action.payload;
            }
        },
        toggleHiddenTicker(state, action) {
            state.tickers!.find(t => t.ticker === action.payload)!.hidden =
                !state.tickers!.find(t => t.ticker === action.payload)!.hidden;
        }
    }
})

export default tickersSlice.reducer;