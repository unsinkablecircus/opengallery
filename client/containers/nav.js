import Nav from '../components/nav/Nav';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authActions';
import { toggleUpload } from '../actions/upload'

import { engine } from '../store'


console.log('engine', engine);
const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuthenticated,
    username: state.user.username
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogoutClick: () => {
      console.log('engggiine', engine)
      engine.save({})
      .then( () => {
        dispatch(logoutUser());
      })
    },
    onToggleUpload: () => {
      dispatch(toggleUpload());
    }
  }
}
// if the second parameter is left out, then it defaults to injecting dispatch only as the second arg
const container = connect(mapStateToProps, mapDispatchToProps)(Nav);

export default container
