import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import { Route, Router, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import thunk from 'redux-thunk'
import reducers from './reducers/index'
import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-localstorage'

const reducer = storage.reducer(reducers);
const engine = createEngine('my-save-key');
const storageMiddleware = storage.createMiddleware(engine, []);
const logger = createLogger({collapsed: true})
const createStoreWithMiddleware = applyMiddleware(thunk, storageMiddleware, logger)(createStore)

const store = createStoreWithMiddleware(reducer);
const history = syncHistoryWithStore(browserHistory, store);

export {store, history, engine}
