const initialState = {
  //TODO
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
  }
}