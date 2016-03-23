import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field'

const Auth = ({
  isAuthenticated,
  onSigninSubmit,
  onSignupSubmit,
  showSigninAndNotSignup,
  toggleSigninOrSignupLink,
  error,
  onSubmit
}) => {
  let info = {};

  const actions = [
    <FlatButton
      label="Submit"
      primary={true}
      onTouchTap={ () => {
        // generate an object with the values from the input forms
        let creds = {};
        for (let key in info) {
          if ( info[key].getValue() !== "" ) {
            creds[key] = info[key].getValue();
          }
        }
        onSubmit(creds, showSigninAndNotSignup);
      }}
    />
  ];

  // define some components here, rendered depending on state
  const signin = (
    <p onClick={toggleSigninOrSignupLink}> Not a member? Sign up here! </p>
  )
  const signup = (
    <div>
      <TextField hintText='First Name' ref= { (node) => {info.firstName = node} }/> <br/>
      <TextField hintText='Last Name' ref= { (node) => {info.lastName = node} }/> <br/>
      <TextField hintText='Email' ref= { (node) => {info.email = node} }/>
      <p onClick={toggleSigninOrSignupLink}> Already a member? Sign in here! </p>
    </div>
  )
  const errorMessage = <p> {error} </p>;

  return (
    <div>
      <Dialog
        title= { showSigninAndNotSignup ? 'Sign in' : 'Sign up'}
        actions={actions}
        modal={true}
        open={ !isAuthenticated }
      >
        <TextField ref= { (node) => {info.username = node} } hintText='Username'/> 
        <br />
        <TextField type='password' ref= { (node) => {info.password = node} } hintText='password'/>
        { showSigninAndNotSignup ? signin : signup }
        { error !== '' ? errorMessage : null }
      </Dialog>
    </div>
  );
}

export default Auth;
