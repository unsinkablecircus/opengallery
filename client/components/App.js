import React from 'react'
import Nav from './nav/Nav'
import Grid from '../containers/grid'

import injectTapEventPlugin from'react-tap-event-plugin'
injectTapEventPlugin()

// modals
import SignupContainer from './nav/Signup'

export default class App extends React.Component {

  render () {
    return (
      <div>
        <SignupContainer />

        <Nav/>
        <Grid/>
      </div>
    )
  }
}

