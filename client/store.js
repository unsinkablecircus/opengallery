import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'

import { Route, Router, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import reducers from './reducers/index'

import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-localstorage'

const reducer = storage.reducer(reducers);

const engine = createEngine('my-save-key');

// with each action, engine.save is called, which saves the previous state.
// the second array parameter blacklists that action, which is fired off by the router
// when you change/refresh pages. Without this, when refreshing, router fires off an action,
// the state will be default/empty, the engine will save that state, and immediately reload
// this blank state. Bad.
const storageMiddleware = storage.createMiddleware(engine, ['LOGOUT']);

// code below will be abstracted into a reducers file
// remember: only the relevant part of the state gets passed to Auth or routing.
// as in, Auth only receives Auth, routing only receives routing.
const logger = createLogger({collapsed: true})
const createStoreWithMiddleware = applyMiddleware(thunk, storageMiddleware, logger)(createStore)

const store = createStoreWithMiddleware(reducer);
const load = storage.createLoader(engine);
const history = syncHistoryWithStore(browserHistory, store);
const loadStore = () => {
  return load(store);
}

export {loadStore, store, history}
