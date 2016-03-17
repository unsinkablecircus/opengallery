import React from 'react'
import Nav from '../containers/nav'
import Grid from '../containers/grid'
import Auth from '../containers/signup'

import injectTapEventPlugin from'react-tap-event-plugin'
injectTapEventPlugin()

// modals

export default class App extends React.Component {

  render () {
    return (
      <div>
        <Auth />
        <Nav />
        <Grid/>
      </div>
    )
  }
}

