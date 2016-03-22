import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import devTools from 'remote-redux-devtools'

import { Route, Router, /*browserHistory*/ } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import App from './components/App'
import getRoutes from './routes'
import reducers from './reducers/index'

require('./stylesheets/main.scss');


import {loadStore, store, history} from './store'

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

