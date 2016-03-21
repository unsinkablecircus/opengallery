import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import devTools from 'remote-redux-devtools'

import { Route, Router, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import App from './components/App'
import getRoutes from './routes'
import reducers from './reducers/index'

import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-localstorage'


// wraps the base reducer, such that it listens
// for the load action and merge in the provided state
const reducer = storage.reducer(reducers);

const engine = createEngine('my-save-key');

// with each action, engine.save is called, which saves the previous state.
// the second array parameter blacklists that action, which is fired off by the router
// when you change/refresh pages. Without this, when refreshing, router fires off an action,
// the state will be default/empty, the engine will save that state, and immediately reload
// this blank state. Bad.
const storageMiddleware = storage.createMiddleware(engine, ['@@router/LOCATION_CHANGE']);

// code below will be abstracted into a reducers file
// remember: only the relevant part of the state gets passed to Auth or routing.
// as in, Auth only receives Auth, routing only receives routing.
const logger = createLogger({collapsed: true})
const createStoreWithMiddleware = applyMiddleware(thunk, storageMiddleware, logger)(createStore)
const store = createStoreWithMiddleware(reducer)
const history = syncHistoryWithStore(browserHistory, store);

require('./stylesheets/main.scss');

// load will rehydrate the state, based on the previously saved state.
// for example, on refresh, this script is re-run, and you need to rehydrate the state.
const load = storage.createLoader(engine);
load(store);

ReactDOM.render(
  <div>
    <Provider store = {store}>
      <Router history={history}>
        {getRoutes()}
      </Router>
    </Provider>
  </div>,
  document.getElementById('app')
);
