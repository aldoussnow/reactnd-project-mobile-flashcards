import * as reducer from './reducers';
import applyMiddleware from "redux/es/applyMiddleware";
import {logger} from "redux-logger";

export const store = createStore(
    reducer,
    applyMiddleware(logger)
);