import * as reducer from './reducers';

export const store = createStore(
    reducer,
    applyMiddleware(logger)
);