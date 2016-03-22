const initialState = {
  //TODO
  isUploadModalOpen: false,
  isUploading: false,
  isDropOpen: false,
  message
};

const upload = (state = initialState, action) => {
  switch (action.type) {
    case 'UPLOAD_REQUEST':
      return Object.assign({}, state, {
        isUploading: true
      })
    case 'UPLOAD_SUCCESS':
      return Object.assign({}, state, {
        isUploading: false,
      })
    case 'UPLOAD_FAILURE':
      return Object.assign({}, state, {
        isUploading: false,
        message
      })
    case 'TOGGLE_PHOTOUPLOAD_MODAL':
      return Object.assign({}, state, {
        isUploadModalOpen: !state.isUploadModalOpen,
        message
      })
    case 'TOGGLE_FILES':
      return Object.assign({}, state, {
        isDropOpen: !state.isDropOpen,
      })
  }
}