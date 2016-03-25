import fetch from 'isomorphic-fetch'
import { storeUserData } from './user'

export function authRequest() {
  return {
    type: 'AUTH_REQUEST',
    payload: {
      isFetching: true,
      isAuthenticated: false,
    }
  }
};

export function authReceive(user) {
  return {
    type: 'AUTH_SUCCESS',
    payload: {
      isFetching: false,
      isAuthenticated: true,
    }
  }
};

export function authError(message) {
  return {
    type: 'AUTH_FAILURE',
    payload: {
      isFetching: false,
      isAuthenticated: false,
      message
    }
  }
};

// Handle Sign up
export function SignupUser(creds) {
  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `username=${creds.username}&password=${creds.password}`
  }
  
  return dispatch => {
    // We dispatch requestSignup to kickoff the call to the API
    dispatch(authRequest())
    return fetch('http://localhost:8000/api/user/signUp', config)
      .then( response => {
        if ( !response.ok ) {
          console.log('bad response', response);
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

// Handle Sign in
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
        console.log('data', data);
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

// Handle Log out
export function logoutUser() {
  return {
    type: 'LOGOUT'
  };
}
