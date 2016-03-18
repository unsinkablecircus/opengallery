import { connect } from 'react-redux'
import Auth from '../components/auth/Auth'
import { SignupUser } from '../actions/signup'
import { SigninUser } from '../actions/signin'
import { authError } from '../actions/authActions'

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    showSigninAndNotSignup: state.auth.showSigninAndNotSignup,
    error: state.auth.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSigninModalClick: () => {
      // refactor to extract these actions
      dispatch({
        type: 'TOGGLE_SIGNIN_MODAL'
      })
    },
    toggleSigninOrSignupLink: () => {
      dispatch({
        type: 'TOGGLE_SIGNIN_OR_SIGNUP_LINK'
      })
    },
    onSubmit: (creds, signinNotSignup) => {
      if ( Object.keys(creds).length < 2 && signinNotSignup || Object.keys(creds).length < 5 && !signinNotSignup ) {
        return dispatch(authError('Please fill out all fields'));
      }
      signinNotSignup ? dispatch(SigninUser(creds)) : dispatch(SignupUser(creds));
    }
  }
}

const container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);

export default container;
