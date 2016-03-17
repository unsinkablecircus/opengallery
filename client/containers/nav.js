import Nav from '../components/nav/Nav';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/logout';



const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuthenticated
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogoutClick: () => {
      dispatch(logoutUser());
    }
  }
}

// if the second parameter is left out, then it defaults to injecting dispatch only as the second arg
const container = connect(mapStateToProps, mapDispatchToProps)(Nav);

export default container