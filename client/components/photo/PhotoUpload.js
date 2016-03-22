import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field'

import Dropzone from './dropZone'


//on click => dispatch action: show photo upload
//action: show photo upload => update state on model component (this?)
// on drop (use drop zone) => dispatch 'isUploading' function (similar to authActions file)
// on http request for photoUpload endpoint, dispatch 'uploaded' action
// 

const PhotoUpload = ({
  isDropOpen,
  isUploaded,
  isUploadModalOpen
}) => {

  let title;
  let description;

  const actions = [

  ];

  return (
    <div>
      <Dialog
        title= { 'Upload Photo' }
        actions={ actions }
        modal={ true }
        open={ isUploadModalOpen }
      >
        <TextField ref= { (node) => {username = node} } hintText='username'/> 
        <br />
        <TextField type='title' ref= { (node) => {title = node} } hintText='title'/>
        <TextField type='description' ref= { (node) => {description = node} } hintText='description'/>
        <Dropzone />
        { error !== '' ? errorMessage : null }
      </Dialog>
    </div>
  )
}
/*

const Auth = ({
  isAuthenticated,
  onSigninSubmit,
  onSignupSubmit,
  showSigninAndNotSignup,
  toggleSigninOrSignupLink,
  error
}) => {
  let username;
  let password;

  const actions = [
    <FlatButton
      label="Submit"
      primary={true}
      onTouchTap={ () => { 
        const creds = {username: username.getValue(), password: password.getValue()};
        showSigninAndNotSignup ? onSigninSubmit(creds) : onSignupSubmit(creds);
      }}
    />,
  ];

  // define some components here, rendered depending on state
  const p = <p onClick={toggleSigninOrSignupLink}> Not a member? Sign up here! </p>;
  const p2 = <p onClick={toggleSigninOrSignupLink}> Already a member? Sign in here! </p>;
  const errorMessage = <p> {error} </p>;

  return (
    <div>
      <Dialog
        title= { showSigninAndNotSignup ? 'Sign in' : 'Sign up'}
        actions={actions}
        modal={true}
        open={ !isAuthenticated }
      >
        <TextField ref= { (node) => {username = node} } hintText='username'/> 
        <br />
        <TextField type='password' ref= { (node) => {password = node} } hintText='password'/>
        { showSigninAndNotSignup ? p : p2 }
        { error !== '' ? errorMessage : null }
      </Dialog>
    </div>
  );
}

export default Auth;
*/ 