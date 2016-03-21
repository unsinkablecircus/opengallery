const initialState = {};

const upload = (state = initialState, action) => {
  switch (action.type) {
    case 'UPLOAD_REQUEST':
      return Object.assign({}, state, {
        isUploading: true
      })
    case 'UPLOAD_SUCCESS':
      return Object.assign({}, state, {
        isUploading: false,
        isUploaded: true
      })
    case 'UPLOAD_FAILURE':
      return Object.assign({}, state, {
        isUploading: false,
        isUploaded: false,
        message
      })
    case /*'UPLOAD_FAILURE'*/:
      return Object.assign({}, state, {
        /* isUploading: false,
        isUploaded: false,
        message */
      })
  }
}