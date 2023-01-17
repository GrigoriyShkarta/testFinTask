import './App.scss';
import {tickersApi} from "./services/TickersSercice";
import Marquee from "react-fast-marquee";
import {formatInTimeZone} from 'date-fns-tz';
import {useAppSelector} from "./hooks/redux";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {ITicker} from "./models/ITicker";
import {tickersSlice} from "./store/reducers/TickersSlice";
import * as io from "socket.io-client";


function App() {
    const socket = io.connect("http://localhost:4000");
    socket.emit('start');
    const {setTickers, deleteTicker, addTicker} = tickersSlice.actions;
    const { tickers } = useAppSelector(state => state.tickersReducer);
    const hiddenTickers = tickers.filter(t => t.hidden);
    const visibleTickers = tickers.filter(t => !t.hidden);

    console.log(hiddenTickers)

    const dispatch = useDispatch();

    useEffect(() => {
        socket.on('ticker', (data: ITicker[]) => {
            dispatch(setTickers(data))
        });
    }, [ ])

    const getMessageTime = (created: string) => {
        const dt = new Date(created);
        return formatInTimeZone(dt, 'Europe/Kyiv', "dd.MM.yyyy HH:mm");
    }

    const clickDeleteTickers = (ticker: string) => {
        dispatch(deleteTicker(ticker))
    };
    const clickAddTickers = (ticker: string) => {
        console.log(ticker)
        dispatch(addTicker(ticker))
    };

    return (
    <div className="App">
        <ul className="wrapper">{visibleTickers && visibleTickers.map(ticker =>
            <li className="ticker" key={ticker.ticker}>
                <div className="named">
                    <b>{ticker.ticker }</b>
                    <span>{ticker.exchange}</span>
                </div>
                <div className="info">
                    <span> {`${ticker.price}$`} </span>
                    <span> Change: {ticker.change } </span>
                    <span>{`${ticker.change_percent}%` } </span>
                    <span>{getMessageTime(ticker.last_trade_time)}</span>
                </div>

                <button onClick={() => clickDeleteTickers(ticker.ticker)}>Delete</button>
            </li>
        )}</ul>
        <select name="s" id="s" onChange={(e) => clickAddTickers((e.target as HTMLSelectElement).value)}>
            {hiddenTickers.map(h =>
                <option>{h.ticker}</option>
            )}
        </select>
        <Marquee>
            {/*<div className="runLine">*/}
            {/*    {tickers && tickers.map(obj =>*/}
            {/*        <p key={obj.ticker}> {obj.ticker} price: {obj.price}$  </p>*/}
            {/*    )}*/}
            {/*</div>*/}
        </Marquee>
    </div>
    );
}

export default App;
