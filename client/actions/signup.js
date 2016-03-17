import fetch from 'isomorphic-fetch'
import { authReceive, authRequest, authError } from './authActions'

// creds contains username and password
export function SignupUser(creds) {
  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `username=${creds.username}&password=${creds.password}`
  }
  // this action creator returns a function. Thunk middleware will know what to do when this is patched into a dispatch function later on.
  return dispatch => {
    // We dispatch requestSignup to kickoff the call to the API
    dispatch(authRequest())

    return fetch('http://localhost:8000/api/user/signUp', config)
      .then( response => {
        if ( !response.ok ) {
          dispatch(authError('incorrect username and/or password'));
          return Promise.reject('incorrect username or password');
        }
        return response.json();
      })
      .then( (data) => {
        dispatch(authReceive());
        localStorage.setItem('id_token', data.token);
        console.log('you are now a member of open gallery!');
      })
      .catch( err => console.log("Error: ", err) )
  }
}





