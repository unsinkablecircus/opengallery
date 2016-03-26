import fetch from 'isomorphic-fetch'
import request from 'superagent'

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

export function uploadSuccess(id) {
  return {
    type: 'UPLOAD_SUCCESS',
    payload: {
      photoId: id
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

  return (dispatch) => {
    dispatch(uploadRequest(photo))
    
    return request
            .post(`http://${window.location.hostname}:${window.location.hostname === '54.153.9.57' ? '80' : '8000'}/api/media/upload`)
            .field('user', userId)
            .attach('artImage', photo[0])
            .end(function(err, res){
              if (err) {
                console.log('Oh no! error', err);
                dispatch(uploadError(err));
              } else {
                alert('yay got ' + JSON.stringify(res.body));
                dispatch(uploadSuccess(res.body.id));
              }
            });
  }
}

export function UploadMetaData(photoData, photoId) {

  return (dispatch) =>
    console.log("Inside UploadMetaData function")

    return request
            .post(`http://${window.location.hostname}:${window.location.hostname === '54.153.9.57' ? '80' : '8000'}/api/media/edit`)
            .field('title', '')
            .field('description', '')
            .field('metaTags', JSON.stringify([]))
            .end(function(err, res) {
              if (err) {
                console.log('Oh no! error updating metaData!', err);
                dispatch(uploadError(err));
              } else {
                alert('yay! great success!' + JSON.stringify(res.body));
                dispatch(uploadSuccess(''));
                //updateSuccess function instead of uploadSuccess
                //dispatch(updateSuccess());
              }
            })
}
