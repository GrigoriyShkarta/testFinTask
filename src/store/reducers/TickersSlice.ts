import {ITicker} from "../../models/ITicker";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getTickers} from "./ActionCreators";
import exp from "constants";
import {tickersApi} from "../../services/TickersSercice";

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
            if (state.tickers.length) {
                state.tickers = state.tickers.map( ticker => {
                    const newTicker = action.payload.tickers?.find((t:ITicker) => t.ticker === ticker.ticker);
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
        deleteTicker(state, action) {
            state.tickers!.find(t => t.ticker === action.payload)!.hidden = true;
        },
        addTicker(state, action) {
            state.tickers!.find(t => t.ticker === action.payload)!.hidden = false;
        }
    }
})

export default tickersSlice.reducer;