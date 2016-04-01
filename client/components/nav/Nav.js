import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import Logo from './Logo'

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

  const style = {
    backgroundImage: 'url(assets/icons/palette.svg)'
  }

  let searchInput;

  return (
    <nav id="nav-component">
      <ul className="nav-list">
        <li className="nav-item-logo">
          <Link to={'/'}>
            <Logo/>
          </Link>
        </li>
        <li className="nav-item nav-item-search">
          <input className="nav-item-input"
            placeholder="discover"
            style={style}
            ref={ (node) => {searchInput = node} }
          />
        </li>
        <li className="nav-item">
          <div
            onClick={ onToggleUpload }
            className="nav-item-button">
            upload
          </div>
          <div className="nav-item-button">
            inbox
          </div>
          <Link
            to={`/profile/${username}`}
            className="nav-item-button">
            { username || 'Sign In'}
          </Link>
          {/*<Link
            to={'/'}
            onClick={ onLogoutClick }
            className="nav-item-button">
            Sign Out
          </Link>*/}
        </li>
      </ul>
    </nav>
  )
}

export default Nav;
