import fetch from 'isomorphic-fetch'

export function storeUserData(data) {
  console.log('data from storeuserData on actions: ', data);
  return {
    type: 'STORE_USER_DATA',
    payload: {
      id: data.id,
      username: data.username,
      name: data.name,
      email: data.email,
      website: data.website,
      facebook_url: data.facebook_url,
      twitter_url: data.twitter_url
    }
  }
};

export function updateRequest() {
  return {
    type: 'UPDATE_REQUEST',
    payload: {
      isFetching: true,
      isUpdated: false,
    }
  }
};

export function updateReceive() {
  return {
    type: 'UPDATE_SUCCESS',
    payload: {
      isFetching: false,
      isUpdated: true,
    }
  }
};

export function updateError(message) {
  return {
    type: 'UPDATE_FAILURE',
    payload: {
      isFetching: false,
      isUpdated: false,
      message
    }
  }
};

export function SaveChanges(data) {
  const config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `id=${data.id}&name=${data.name === 'undefined' ? null : data.name}&email=${data.email === 'undefined' ? null : data.email}&website=${data.website === 'undefined' ? null : data.website}&facebook_url=${data.facebook_url ? null : data.facebook_url}&twitter_url=${data.twitter_url ? null : data.twitter_url}`
  }
  return dispatch => {
    dispatch(updateRequest());
    return fetch('http://localhost:8000/api/user/saveChanges', config)
      .then((response) => {
        if ( !response.ok ) {
          dispatch(updateError('Error updating data'));
          return Promise.reject('Error updating data');
        }
        return response.json();
      })
      .then((data) => {
        dispatch(updateReceive());
        dispatch(storeUserData(data));
        dispatch({
          type: 'SWITCH_EDIT_MODE'
        })
      })
      .catch(err => {
        console.log("Error: ", err)
      });
  }
}
