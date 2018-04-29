import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import {logger} from "redux-logger";

export const store = createStore(
    reducer,
    applyMiddleware(logger)
);