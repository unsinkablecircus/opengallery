export function uploadRequest() {
  return {
    type: //'POST_REQUEST',
    payload: {
      isUploading: true,
      isUploaded: false,
    }
  }
};

export function uploadSuccess(url) {
  return {
    type: 'UPLOAD_SUCCESS',
    payload: {
      isUploading: false,
      isUploaded: true,
      photoUrl: url,
    }
  }
};

export function uploadError(message) {
  return {
    type: 'UPLOAD_FAILURE',
    payload: {
      isUploading: false,
      isUploaded: false,
      message
    }
  }
};