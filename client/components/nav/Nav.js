import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import AppBar from 'material-ui/lib/app-bar'
import CreateIcon from 'material-ui/lib/svg-icons/image/palette'
import FlatButton from 'material-ui/lib/flat-button'
import IconButton from 'material-ui/lib/icon-button'
import IconMenu from 'material-ui/lib/menus/icon-menu'
import MenuItem from 'material-ui/lib/menus/menu-item'
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert'
import ProfileIcon from 'material-ui/lib/svg-icons/action/face'

import darkBaseTheme from 'material-ui/lib/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider'
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme'

import { connect } from 'react-redux'
import { browserHistory } from 'react-router'



const darkMuiTheme = getMuiTheme(darkBaseTheme)

// refactored to utilize the container / presentational component model
// Note: Nav now has a container, which manages the state

let Nav = ({
  isAuth,
  id,
  username, 
  onLogoutClick,
  onToggleUpload,
  onSearchSubmit,
  handleConversationsIconClick
}) => {

  const styles = {
    nav: {
      position: 'fixed',
      top: 0
    },
    title: {
      color: 'white',
      fontSize: '1.8em',
      textTransform: 'capitalize'
    }
  }

  let searchInput;

  return (
    <MuiThemeProvider muiTheme={darkMuiTheme}>
    
      <AppBar
        id="nav-component"
        style={styles.nav}
        iconElementLeft={
          <div>
            <Link to={'/'}><FlatButton
              label='Open Gallery'
              backgroundColor='#0097a7'
              style={styles.title}
            /></Link>
            <IconButton tooltip='Create' onClick={ onToggleUpload }>
              <CreateIcon color='#303030'/>
            </IconButton>
            <IconButton 
              tooltip='Discover'
              onClick={ () => {handleConversationsIconClick(id)}}
            >
              <DiscoverIcon color='#303030'/>
            </IconButton>
            <input
              style={{borderRadius: '3px', height: '30px', width: '500px', marginLeft: '20px', transform: 'translateY(-5px)', fontSize:'20px'}} 
              ref={ (node) => {searchInput = node} }
            />
            <FlatButton 
              style={{'marginLeft': '10px', fontSize:'20px'}}
              label='Search'
              onTouchTap={ () => {onSearchSubmit(id, searchInput.value)} }
            />
          </div>
        }
        iconElementRight={
          <IconMenu
            iconButtonElement={
              <IconButton><ProfileIcon/></IconButton>
            }
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          >
            <Link to={`/profile/${username}`}>
              <MenuItem 
                primaryText='Profile'
              />
            </Link>
            <Link to={'/'}><MenuItem primaryText='Sign Out' onClick={ onLogoutClick }/></Link>
          </IconMenu>
        }
      />
   </MuiThemeProvider>
  )
}

export default Nav;
