import 'babel-polyfill'
import { Route, Router, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { Provider } from 'react-redux'
import getRoutes from './routes'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, combineReducers, applyMiddleware } from 'redux'

import App from './components/App'
import reducers from './reducers/index'


// code below will be abstracted into a reducers file
// remember: only the relevant part of the state gets passed to Auth or routing.
// as in, Auth only receives Auth, routing only receives routing.
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
