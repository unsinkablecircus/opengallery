import fetch from 'isomorphic-fetch'
import { authReceive, authRequest, authError } from './authActions'

// creds contains username and password
export function SigninUser(creds) {

  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `username=${creds.username}&password=${creds.password}`
  }
  // this action creator returns a function. Thunk middleware will know what to do when this is patched into a dispatch function later on.
  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(authRequest())
    return fetch('http://localhost:8000/api/user/signIn', config)
      .then(response =>
        response.json()
      )
      .then((data) =>  {
        if ( !data.match ) {
          dispatch(authError('Incorrect username or password'));
        } else {
          dispatch(authReceive());
        }
      })
      .catch(err => console.log("Error: ", err))
  }
}

