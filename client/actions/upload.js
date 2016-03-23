import fetch from 'isomorphic-fetch'

export function toggleUpload() {
  return {
    type: 'TOGGLE_PHOTOUPLOAD_MODAL',
  }
};

export function toggleDropWindow() {
  return {
    type: 'TOGGLE_PHOTOUPLOAD_MODAL',
  }
};

export function uploadRequest() {
  return {
    type: 'UPLOAD_REQUEST',
    payload: {
      isUploading: true,
      isUploaded: false
    }
  }
};

export function uploadSuccess(url) {
  return {
    type: 'UPLOAD_SUCCESS',
    payload: {
      isUploading: false,
      isUploaded: true,
      photoUrl: url
    }
  }
};

export function uploadError(message) {
  return {
    type: 'UPLOAD_FAILURE',
    payload: {
      isUploading: false,
      isUploaded: false,
      message: message
    }
  }
};

export function UploadPhoto(photo, userId) {

  const config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `user_Id=${userId}`,
    attach: photo
  }

  return (dispatch) => {
    {// dispatch(uploadRequest())
    }
    return fetch('http://localhost:8000/api/media/uploadPhoto', config)
      .then((response) => {
        if ( !response.ok ) {
          dispatch(uploadError('Error uploading photo'))
          return Promise.reject('Error uploading photo')
        }
        return response.json();
      })
      .then((url) => {
        dispatch(uploadSuccess(url))
      })
      .catch((err) => {
        if ( !url ) {
          dispatch(authError('Error uploading photo; perhaps your photo was too large'));
        }
        console.log("Error uploading photo: ", err)
      })
  }
}

export function UploadMetaData(photoData, photoId) {

  const config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `username=${photoData.userId}&title=${photoData.title}&description=${photoData.description}`
  }

  return (dispatch) => {
    dispatch(uploadRequest())
    let url = 'http://localhost:8000/api/media/' + photoId;
    return fetch(url, config)
      .then((response) => {
        if ( !response.ok ) {
          dispatch(uploadError('Error uploading photo'))
          return Promise.reject('Error uploading photo')
        }
        return response.json();
      })
      .then((url) => {
        dispatch(uploadSuccess(url))
      })
      .catch((err) => {
        if ( !url ) {
          dispatch(authError('Error uploading photo; perhaps your photo was too large'));
        }
        console.log("Error uploading photo: ", err)
      })
  }
}
