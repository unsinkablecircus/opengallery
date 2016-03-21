import fetch from 'isomorphic-fetch';
import { authReceive, authRequest, authError } from './authActions';
import { storeUserData } from './user';

// creds contains username and password
export function SigninUser(creds) {

  const config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `username=${creds.username}&password=${creds.password}`
  }
  return dispatch => {
    dispatch(authRequest());
    return fetch('http://localhost:8000/api/user/signIn', config)
      .then(response =>
        response.json()
      )
      .then((data) =>  {
        if ( !data.match ) {
          dispatch(authError('Incorrect username or password'));
        } else {
          localStorage.setItem('id_token', data.token);
          dispatch(authReceive());
          dispatch(storeUserData(data));
        }
      })
      .catch(err => console.log("Error: ", err))
  }
}
