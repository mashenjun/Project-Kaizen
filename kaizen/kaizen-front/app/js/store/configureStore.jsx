import {createStore, applyMiddleware, compose} from 'redux'
import createLogger from 'redux-logger'
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/rootSaga';
import rootReducer from '../reducers/rootReducer'
import DevTools from '../containers/DevTools';

const loggerMiddleware = createLogger();
const sagaMiddleware = createSagaMiddleware();

const middleWares = [loggerMiddleware,sagaMiddleware];
const enhancer = compose(
    applyMiddleware(...middleWares),
    DevTools.instrument()
);

export default function configureStore(preloadedState) {
    const store = createStore(
        rootReducer,
        preloadedState,
        enhancer
    );
    sagaMiddleware.run(rootSaga);
    return store;
}