import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {tickersSlice} from "../../store/reducers/TickersSlice";

import './ListHiddenTickers.scss'


const ListHiddenTickers = () => {
    const { tickers } = useAppSelector(state => state.tickersReducer);
    const {toggleHiddenTicker} = tickersSlice.actions;
    const hiddenTickers = tickers.filter(t => t.hidden);
    const dispatch = useAppDispatch()

    const clickAddTickers = (ticker: any) => {
        dispatch(toggleHiddenTicker(ticker))
    };

    return (
        <div className="wrapperHiddenTickers">
            {hiddenTickers.length > 0 &&
                <>
                    <h1>Add new tickers</h1>
                    <div className="listHiddenTickers">
                        {hiddenTickers.map(h =>
                            <div className="newTickers" onClick={() => clickAddTickers(h.ticker)}>{h.ticker}</div>
                        )}
                    </div>
                </>
            }
        </div>
    );
};

export default ListHiddenTickers;