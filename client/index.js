// <<<<<<< e083be82756a39ec4b14ace3b2190f8c82d1a8e9
// import 'babel-polyfill'
// import React from 'react'
// import reducers from './reducers/index'
// import App from './components/App'

// let store = createStore(reducers)

// render(
//   <Provider store={store}>
//     <App/>
//   </Provider>,
// =======

import { Route, Router, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { Provider } from 'react-redux'
import getRoutes from './routes'
import thunkMiddleware from 'redux-thunk'
// import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, combineReducers, applyMiddleware } from 'redux'

import App from './components/App'
import reducers from './reducers/index'


// code below will be abstracted into a reducers file
// remember: only the relevant part of the state gets passed to Auth or routing.
// as in, Auth only receives Auth, routing only receives routing.

let createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
const store = createStoreWithMiddleware(reducers);
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
