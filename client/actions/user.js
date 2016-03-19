import fetch from 'isomorphic-fetch'
// import { authReceive, authRequest, authError } from './authActions'

export function editMode() {
  return {
    type: 'EDIT_MODE',
    payload: {
      
    }
  }
};

export function switchEditMode() {
  return {
    type: 'SWITCH_EDIT_MODE',
    payload: {
      
    }
  }
};

export function UPDATERequest() {
  return {
    type: 'UPDATE_REQUEST',
    payload: {
      isFetching: true,
      isAuthenticated: false,
    }
  }
};

export function updateReceive() {
  return {
    type: 'UPDATE_SUCCESS',
    payload: {
      isFetching: false,
      isAuthenticated: true,
    }
  }
};

export function updateError(message) {
  return {
    type: 'UPDATE_FAILURE',
    payload: {
      isFetching: false,
      isAuthenticated: false,
      message
    }
  }
};

// creds contains username and password
export function SigninUser(creds) {

  const config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: 
  }
  return dispatch => {
    dispatch(authRequest())
    return fetch('http://localhost:8000/api/user/signIn', config)
      .then(response =>
        response.json()
      )
      .then((data) =>  {
        console.log('data: ', data);
        if ( !data.match ) {
          dispatch(authError('Incorrect username or password'));
        } else {
          localStorage.setItem('id_token', data.token);
          dispatch(authReceive());
          // dispatch to User reducer with user data
        }
      })
      .catch(err => console.log("Error: ", err))
  }
}
