export function selectPhoto() {
  return {
    type: 'UPLOAD_MENU',
    payload: {
      isUploading: false,
      isUploaded: false,
      isDropOpen: true
    }
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
      message
    }
  }
};