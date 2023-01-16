import axios from "axios";
import {ITicker} from "../../models/ITicker";
import {createAsyncThunk} from "@reduxjs/toolkit";


export const getTickers = createAsyncThunk(
    'getTickers',
    async (_, thunkAPI) => {
        const res = await axios.get<ITicker[]>('http://localhost:4000')
        return res.data;
    }
)