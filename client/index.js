// import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
// import { Provider } from 'react-redux'
// import { createStore } from 'redux'
// import Reducers from './reducers'
import App from './components/App'

// let store = createStore(Reducers)

render(
  <App/>,
  document.getElementById('app')
)
