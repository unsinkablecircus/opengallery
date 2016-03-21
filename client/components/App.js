import React from 'react'

import Auth from '../containers/auth'
import Grid from '../containers/grid'
import Nav from '../containers/nav'

import injectTapEventPlugin from'react-tap-event-plugin'
injectTapEventPlugin()

const App = ({ children }) => {
  var grid

  if (window.location.pathname === '/') {
    grid = <Grid/>
  }

  return (
    <div>
      <Auth/>
      <Nav/>
      {grid}
      {children}
    </div>
  )
}

export default App
