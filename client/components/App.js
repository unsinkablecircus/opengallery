import React from 'react'

import Auth from '../containers/auth'
import Grid from '../containers/grid'
import Nav from '../containers/nav'
import Gallery from '../containers/gallery'

import injectTapEventPlugin from'react-tap-event-plugin'
injectTapEventPlugin()

const App = ({ children, displayGallery }) => {
  return (
    <div>
      <Auth/>
      { displayGallery ? <Gallery/> : '' }
      <Nav/>
      {children}
    </div>
  )
}

export default App
