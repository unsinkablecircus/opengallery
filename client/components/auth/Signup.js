import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field'

import { connect } from 'react-redux'

const Signup = ({
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
      onTouchTap={ onSigninModalClick }
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

export default Signup;







