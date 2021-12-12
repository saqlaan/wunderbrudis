import {compose, applyMiddleware, createStore} from 'redux'
import persistStore from 'redux-persist/es/persistStore'
import createSagaMiddleware from 'redux-saga'
import {rootReducer} from './reducers'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()

const composedMiddleware = () => {
  if (__DEV__) {
    const composeEnhancers = __DEV__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
      : compose
    return composeEnhancers(applyMiddleware(sagaMiddleware))
  }
  compose(applyMiddleware(sagaMiddleware))
}

const globalStore = createStore(rootReducer, {}, composedMiddleware())
const persistor = persistStore(globalStore)
export {globalStore, persistor}
sagaMiddleware.run(rootSaga)
