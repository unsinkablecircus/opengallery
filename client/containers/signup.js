import { connect } from 'react-redux'
import Auth from '../components/auth/Signup' 
import { SignupUser } from '../actions/signup' 
import { SigninUser } from '../actions/signin'

const mapStateToProps = (state) => {
  // return object with the relevant state. related to DATA
  return {
    isAuthenticated: state.auth.isAuthenticated,
    // this is used to toggle between either the Signin or Signup forms.
    showSigninAndNotSignup: state.auth.showSigninAndNotSignup,
  }
}

const mapDispatchToProps = (dispatch) => {
  // return object with the props that depend on a dispatch action. related to BEHAVIOR
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

// tentative convention will be that containers are lower case, while their corresponding presentational components are upper case
const container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);

export default container;