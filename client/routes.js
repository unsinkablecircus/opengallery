import React from 'react'
import {Route, IndexRoute} from 'react-router'

import App from './containers/app'
import User from './containers/user'
import Grid from './containers/grid'

export default function getRoutes() {
  return (
    <Route path='/' component={App}>
      <IndexRoute component={Grid}/>
      <Route path='profile/:username' component={User}/>
    </Route>
  )
}
