import fetch from 'isomorphic-fetch'
import request from 'superagent'

export function storeUserData(data) {
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

export function fetchingUserInfo() {
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

export function switchEditMode() {
  return {
    type: 'SWITCH_EDIT_MODE'
  }
};

export function switchDeleteMode() {
  return {
    type: 'SWITCH_DELETE_MODE'
  }
};

export function deleteRequest() {
  return {
    type: 'DELETE_REQUEST',
    payload: {
      isDeleting: true,
      isDeleted: false
    }
  }
};

export function deleteSuccess() {
  return {
    type: 'DELETE_SUCCESS',
    payload: {
      isDeleting: false,
      isDeleted: true
    }
  }
};

export function deleteError(message) {
  return {
    type: 'DELETE_SUCCESS',
    payload: {
      isDeleting: false,
      isDeleted: true,
      message
    }
  }
};

export function DeletePhoto(photosArray) {

  return (dispatch) => {
    dispatch(deleteRequest(photoId)) //TODO: dispatch delete request
    return request
            .delete(`http://${window.location.hostname}:${window.location.hostname === '54.153.9.57' ? '80' : '8000'}/api/media/delete`)
            .field('photos', photosArray)
            .end(function(err, res) {
              if (err) {
                console.log('Oh no! error deleting your photo', photoId, err);
                dispatch(deleteError(err))
              } else {
                dispatch(deleteSuccess())
              }
            })
  }
}

export function SaveChanges(data) {
  const config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `id=${data.id}&name=${data.name === 'undefined' ? null : data.name}` +
          `&email=${data.email === 'undefined' ? null : data.email}` +
          `&website=${data.website === 'undefined' ? null : data.website}` + 
          `&facebook_url=${data.facebook === 'undefined' ? null : data.facebook}` + 
          `&twitter_url=${data.twitter === 'undefined' ? null : data.twitter}` + 
          `&about=${data.about === 'undefined' ? null : data.about}` +
          `&media=${data.media === 'undefined' ? null : data.media}` 
  }
  return dispatch => {
    dispatch(fetchingUserInfo())

    return fetch(`http://${window.location.hostname}:${window.location.hostname === '54.153.9.57' ? '80' : '8000'}/api/user/saveChanges`, config)
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




