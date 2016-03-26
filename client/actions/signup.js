import fetch from 'isomorphic-fetch'
import { authReceive, authRequest, authError } from './authActions'
import { storeUserData } from './user';

// creds contains username and password
export function SignupUser(creds) {
  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `username=${creds.username}&password=${creds.password}`
  }
  
  return dispatch => {
    // We dispatch requestSignup to kickoff the call to the API
    dispatch(authRequest())
    return fetch(`http://${window.location.hostname}:8000/api/user/signUp`, config)
      .then( response => {
        if ( !response.ok ) {
          dispatch(authError('User already exists'));
          return Promise.reject('incorrect username or password');
        }
        return response.json();
      })
      .then( (data) => {
        dispatch(authReceive());
        localStorage.setItem('id_token', data.token);
        dispatch(storeUserData(data));
        console.log('you are now a member of open gallery!');
      })
      .catch( err => console.log("Error: ", err) )
  }
}
