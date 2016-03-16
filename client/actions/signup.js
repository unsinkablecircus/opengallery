import fetch from 'isomorphic-fetch'

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'

function requestSignup(creds) {
  return {
    type: SIGNUP_REQUEST,
    payload: {
      isFetching: true,
      isAuthenticated: false,
      creds
    }
  }
};

function receiveSignup(user) {
  return {
    type: SIGNUP_SUCCESS,
    payload: {
      isFetching: false,
      isAuthenticated: true,
      id_token: user.id_token
    }
  }
};

function signupError(message) {
  return {
    type: SIGNUP_FAILURE,
    payload: {
      isFetching: false,
      isAuthenticated: false,
      message
    }
  }
};



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
    dispatch(requestSignup(creds))

    return fetch('http://localhost:8000/api/user/signUp', config)
      .then(response => {
        if ( !response.ok ) {
          dispatch(signupError(response.error));
          return Promise.reject(user);
        }
        return response.json();
      })
      .then( (data) => {
        console.log(data.message);

        // console.log('data', data);
      })
      // .then(({ user, response }) =>  {
      //   if (!response.ok) {
      //     // If there was a problem, we want to
      //     // dispatch the error condition
      //     dispatch(loginError(user.message))
      //     return Promise.reject(user)
      //   } else {
      //     // If login was successful, set the token in local storage
      //     localStorage.setItem('id_token', user.id_token)
      //     // Dispatch the success action
      //     dispatch(receiveLogin(user))
      //   }
      // })
      .catch(err => console.log("Error: ", err))
  }
}





