import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {ITicker} from "../models/ITicker";
import io from "socket.io-client";

export const tickersApi = createApi({
    reducerPath: 'tickersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000'
    }),
    endpoints: (builder) => ({
        getTickers: builder.query<ITicker[], void>({
            queryFn: () => ({ data: [] }),
            async onCacheEntryAdded(
                _,
                {cacheDataLoaded, cacheEntryRemoved, updateCachedData},
            ) {
                try {
                    await cacheDataLoaded;
                    const socket = io("http://localhost:4000");
                    socket.on('connect', () => {
                        socket.emit('start')
                    })
                    socket.on('ticker', (data: ITicker[]) => {
                        updateCachedData((draft: any) => {
                            data.forEach((d,index) => draft[index] = d);
                        });
                    });

                    await cacheEntryRemoved;
                    socket.off('connect');
                    socket.off('ticker');
                    socket.off('start');
                } catch {

                }
            }
        })
    }),
})