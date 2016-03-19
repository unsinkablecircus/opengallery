import React from 'react'
import {Route} from 'react-router'

import App from './containers/App'
import User from './components/user/User'

export default function getRoutes() {
  return (
    <div>
      <Route path='/' component={App}>
      </Route>
      <Route path='/profile/:username' component={User}>
      </Route>
    </div>
  )
}
