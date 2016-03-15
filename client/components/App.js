import React from 'react'
import Nav from './nav/Nav'
import Grid from '../containers/grid'

import injectTapEventPlugin from'react-tap-event-plugin'
injectTapEventPlugin()

export default class App extends React.Component {
  render () {
    return (
      <div>
        <Nav/>
        <Grid/>
      </div>
    )
  }
}
