import { connect } from 'react-redux'
import Signup from '../components/auth/Signup'

const mapStateToProps = (state) => {
  // return object with the relevant state. related to DATA
  return {
    showSigninModal: state.modal.signIn
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
    onSigninSubmit: () => {
      dispatch({
        type: 'TOGGLE_LOGGEDIN'
      })
    }
  }
}

// tentative convention will be that containers are lower case, while their corresponding presentational components are upper case
const container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);

export default container;