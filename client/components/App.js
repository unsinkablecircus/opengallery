import React from 'react'

import Auth from '../containers/auth'
import Gallery from '../containers/gallery'
import Grid from '../containers/grid'
import Nav from '../containers/nav'

import injectTapEventPlugin from'react-tap-event-plugin'
injectTapEventPlugin()

const App = ({ displayGallery }) => (
  <div>
    {console.log("In App: displayGallery = ", displayGallery)}
    <Auth/>
    { displayGallery ? <Gallery/> : '' }
    <Nav/>
    <Grid/>
  </div>
)

export default App
