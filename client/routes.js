import React from 'react'
import {Route} from 'react-router'

import App from './containers/app'
import User from './containers/user'

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
