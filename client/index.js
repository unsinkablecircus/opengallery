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

import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { Provider } from 'react-redux'
import getRoutes from './routes'


// import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
// import Reducers from './reducers'
import App from './components/App'



// code below will be abstracted into a reducers file
const reducer = combineReducers({
  // {...reducers},
  routing: routerReducer
});

const store = createStore(reducer)
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <div>
    <Router history={history}>
      {getRoutes()}
    </Router>
  </div>,
  document.getElementById('app')
)
