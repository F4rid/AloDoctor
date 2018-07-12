import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from './../reducers';

const middleware = [thunk];
middleware.push(createLogger());

const store = createStore(
        reducers,
        undefined, 
        compose( 
                applyMiddleware(...middleware)
        )
);

export default store;