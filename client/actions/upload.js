import fetch from 'isomorphic-fetch'

export function toggleUpload() {
  return {
    type: 'TOGGLE_PHOTOUPLOAD_MODAL',
  }
};

export function toggleDropWindow() {
  return {
    type: 'TOGGLE_DROP_WINDOW',
  }
};

export function uploadRequest(file) {
  return {
    type: 'UPLOAD_REQUEST',
    payload: {
      file: file
    }
  }
};

export function uploadCancel() {
  console.log("Inside onUploadCancel function in upload actions");
  return {
    type: 'UPLOAD_CANCEL',
  }
};

export function uploadSuccess(url) {
  return {
    type: 'UPLOAD_SUCCESS',
    payload: {
      photoUrl: url
    }
  }
};

export function uploadError(message) {
  return {
    type: 'UPLOAD_FAILURE',
    payload: {
      message: message
    }
  }
};

export function UploadPhoto(photo, userId) {
  console.log("Iniside uploadPhoto function in upload action file with photo and userID: ", photo, userId);
  const config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `user_Id=${userId}`,
    attach: photo
  }

  return (dispatch) => {
    dispatch(uploadRequest())
    return fetch('http://localhost:8000/api/media/uploadPhoto', config)
      .then((response) => {
        if ( !response.ok ) {
          dispatch(uploadError('Error uploading photo'))
          return Promise.reject('Error uploading photo')
        }
        return response.json();
      })
      .then((photoId) => {
        console.log("uploadSuccess in upload actions", photoId);
        dispatch(uploadSuccess(photoId))
      })
      .catch((err) => {
        if ( !photoId ) {
          dispatch(uploadError('Error uploading photo; perhaps your photo was too large'));
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
