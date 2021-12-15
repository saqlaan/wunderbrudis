import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { persistStore } from 'redux-persist';
import rootSaga from './sagas'
import { rootReducer } from './reducers';

const sagaMiddleWare = createSagaMiddleware()
const store = createStore(rootReducer, applyMiddleware(sagaMiddleWare))
const persistor = persistStore(store)
sagaMiddleWare.run(rootSaga)

export {store, persistor}