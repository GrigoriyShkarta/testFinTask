import {useEffect} from "react";

import * as io from "socket.io-client";

import {useAppDispatch} from "./hooks/redux";
import {tickersSlice} from "./store/reducers/TickersSlice";

import {ITicker} from "./models/ITicker";

import ListTickers from "./components/listTickers/ListTickers";
import ListHiddenTickers from "./components/listHiddenTickers/ListHiddenTickers";
import RunLine from "./components/runLine/RunLine";

import './App.scss';


function App() {
    const socket = io.connect("http://localhost:4000");
    socket.emit('start');
    const {setTickers} = tickersSlice.actions;

    const dispatch = useAppDispatch();

    useEffect(() => {
        socket.on('ticker', (data: ITicker[]) => {
            dispatch(setTickers(data))
        });
    }, [ ])

    return (
        <div className="App">
            <ListTickers/>
            <ListHiddenTickers/>
            <RunLine/>
        </div>
    );
}

export default App;
