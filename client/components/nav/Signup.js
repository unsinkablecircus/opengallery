import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field'

import { connect } from 'react-redux'


const Signup = ({
  loggedIn,
  showSigninModal,
  onSigninModalClick,
  onSigninSubmit
}) => {
  let username;
  let password;

  const actions = [
    <FlatButton
      label="Cancel"
      secondary={true}
      onTouchTap={ onSigninModalClick }
    />,
    <FlatButton
      label="Submit"
      primary={true}
      onTouchTap={ () => {console.log(username); onSigninModalClick(); } }
    />,
  ];
  return (
    <div>
      <Dialog
        title="Sign Up"
        actions={actions}
        modal={true}
        open={ showSigninModal }
      >
        <TextField ref= { (node) => {username = node} } hintText='username'/><br />
        <TextField hintText='password'/>
      </Dialog>
    </div>
  );
}



const mapStateToProps = (state) => {
  // return object with the relevant state. related to DATA
  return {
    loggedIn: state.Auth.loggedIn,
    showSigninModal: state.Auth.showSigninModal
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

const SignupModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);

export default SignupModal;







