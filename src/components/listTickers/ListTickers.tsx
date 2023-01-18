import {formatInTimeZone} from "date-fns-tz";

import {useAppDispatch, useAppSelector} from "../../hooks/redux";

import {tickersSlice} from "../../store/reducers/TickersSlice";

import './ListTickers.scss'
import usePrevious from "../../hooks/usePrefious";


const ListTickers = () => {
    const { tickers } = useAppSelector(state => state.tickersReducer);
    const {toggleHiddenTicker} = tickersSlice.actions;
    const visibleTickers = tickers.filter(t => !t.hidden);
    const dispatch = useAppDispatch();

    const prevTickers = usePrevious(tickers);

    const getMessageTime = (created: string) => {
        const dt = new Date(created);
        return formatInTimeZone(dt, 'Europe/Kyiv', "dd.MM.yyyy HH:mm");
    }

    const clickDeleteTickers = (ticker: string) => {
        dispatch(toggleHiddenTicker(ticker))
    };

    return (
        <ul className="wrapper">{visibleTickers && visibleTickers.map(ticker =>
            <li className={prevTickers!.length > 0 ?
                prevTickers!.find(t => t.ticker === ticker.ticker)!.price > ticker!.price  ? "redTicker" : "greenTicker" : "greenTicker"}
                key={ticker.ticker}>
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
    );
};

export default ListTickers;