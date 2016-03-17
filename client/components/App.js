import React from 'react'
import Nav from './nav/Nav'
import Grid from '../containers/grid'
import Signup from '../containers/signup'

import injectTapEventPlugin from'react-tap-event-plugin'
injectTapEventPlugin()

// modals

export default class App extends React.Component {

  render () {
    return (
      <div>
        <Signup/>
        <Nav/>
        <Grid/>
      </div>
    )
  }
}
