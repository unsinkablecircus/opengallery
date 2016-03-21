export function uploadRequest() {
  return {
    type: //'POST_REQUEST',
    payload: {
      isUploading: true,
      isUploaded: false,
    }
  }
};

export function uploadSuccess(user) {
  return {
    type: 'UPLOAD_SUCCESS',
    payload: {
      isUploading: false,
      isUploaded: true,
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