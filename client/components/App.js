import React from 'react'
import Nav from './nav/Nav'
import Grid from './grid/Grid'

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
>>>>>>> 0fab82e9cd8e2ab942b2b25d946e98e17e3b0caa
