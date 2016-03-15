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

// import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
// import Reducers from './reducers'
import App from './components/App'


var initialState = {
  loggedIn: false,
  showSigninModal: false
}


// define a reducer that handles whether user is logged in or not.
// will be refactored.
const Auth = (state=initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_LOGGEDIN':
    // can't use ...state spread operator. Probably an issue with babel?
      return Object.assign({}, state, {
          loggedIn: !state.loggedIn
      });
    case 'TOGGLE_SIGNIN_MODAL':
      return Object.assign({}, state, {
          showSigninModal: !state.showSigninModal,
      });
    default:
      return state;
  }
}

// code below will be abstracted into a reducers file
// remember: only the relevant part of the state gets passed to Auth or routing.
// as in, Auth only receives Auth, routing only receives routing.
const reducer = combineReducers({
  Auth,
  routing: routerReducer
});

const store = createStore(reducer)
const history = syncHistoryWithStore(browserHistory, store)


ReactDOM.render(
  <div>
    <Provider store = {store}>
      <Router history={history}>
        {getRoutes()}
        </Route>
      </Router>
    </Provider>
  </div>,
  document.getElementById('app')
)
