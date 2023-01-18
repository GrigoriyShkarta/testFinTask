import Marquee from "react-fast-marquee";
import {useAppSelector} from "../../hooks/redux";

import './RunLine.scss'


const RunLine = () => {
    const { tickers } = useAppSelector(state => state.tickersReducer);

    return (
        <Marquee>
            <div className="runLine">
                {tickers && tickers.map(obj =>
                    <p key={obj.ticker}> {obj.ticker} price: {obj.price}$  </p>
                )}
            </div>
        </Marquee>
    );
};

export default RunLine;