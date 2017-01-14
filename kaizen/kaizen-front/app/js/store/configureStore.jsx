import { createStore, applyMiddleware, compose} from 'redux'
import createLogger from 'redux-logger'
import rootReducer from '../reducers/rootReducer'
import DevTools from '../containers/DevTools';

const loggerMiddleware = createLogger()

const enhancer = compose(
  applyMiddleware(loggerMiddleware),
  DevTools.instrument()
);

export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    enhancer
  )
}