import {useEffect} from 'react';
import './App.css';
import * as io from "socket.io-client";
// import {useAppDispatch} from "./hooks/redux";
import {useDispatch} from "react-redux";
import {ITicker} from "./models/ITicker";
import {getTickers} from "./store/reducers/ActionCreators";
import {tickersSlice} from "./store/reducers/TickersSlice";
import {useAppSelector} from "./hooks/redux";


function App() {
  const socket = io.connect("http://localhost:4000");
  socket.emit('start');
  const {setTickers} = tickersSlice.actions;
  const {tickers} = useAppSelector(state => state.tickersReducer);

  console.log(tickers)

  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('ticker', (data: ITicker[]) => {
      dispatch(setTickers(data))
    });
  }, [ ])

  return (
    <div className="App">
      {tickers.map(a => {
        
      })}
    </div>
  );
}

export default App;
