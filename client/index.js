import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

import { Route, Router, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import getRoutes from './routes'

import App from './components/App'
import reducers from './reducers/index'

const logger = createLogger()
const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore)
const store = createStoreWithMiddleware(reducers)
const history = syncHistoryWithStore(browserHistory, store);

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
