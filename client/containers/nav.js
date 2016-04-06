import Nav from '../components/nav/Nav';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authActions';
import { toggleUpload } from '../actions/upload';
import { loadData } from '../actions/grid';
import { toggleMessageModal, fetchConversations } from '../actions/messageFeed.actions'
import { toggleDropdown } from '../actions/nav.actions'


import { push } from 'react-router-redux'
import { browserHistory } from 'react-router'

import {store} from '../store'

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuthenticated,
    id: state.user.id,
    username: state.user.username,
    showDropdown: state.nav.showDropdown
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogoutClick: () => {
      dispatch(logoutUser());
    },
    onToggleUpload: () => {
      dispatch(toggleUpload());
    },
    handleConversationsIconClick: (self_id) => {
      dispatch(fetchConversations(self_id));
      dispatch(toggleMessageModal());
    },
    onSearchSubmit: (id, searchInput) => {
      browserHistory.push('/');
      dispatch(loadData(id, null, 0, searchInput));
    },
    onProfileClick: () => {
      dispatch(toggleDropdown());
    }
  }
}
// if the second parameter is left out, then it defaults to injecting dispatch only as the second arg
const container = connect(mapStateToProps, mapDispatchToProps)(Nav);

export default container
