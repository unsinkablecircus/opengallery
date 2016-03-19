import { connect } from 'react-redux'
import Auth from '../components/auth/Auth'
import { SignupUser } from '../actions/signup'
import { SigninUser } from '../actions/signin'

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
    // this will be called when you hear back from an ajax request.
    onSigninSubmit: (creds) => {
      dispatch(SigninUser(creds));
    },
    onSignupSubmit: (creds) => {
      dispatch(SignupUser(creds));
    },
    toggleSigninOrSignupLink: () => {
      dispatch({
        type: 'TOGGLE_SIGNIN_OR_SIGNUP_LINK'
      })
    }
  }
}

const container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);

export default container;
