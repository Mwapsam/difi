import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import exchangeReducer from './exchanges/exchange';
import converterReducer from './converter/converter';

const reducer = combineReducers({
  exchange: exchangeReducer,
  converter: converterReducer,
});

const store = createStore(reducer, compose(applyMiddleware(thunk, logger)));

export default store;
