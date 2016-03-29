import { initialState } from '../../test/initialState'
import { GRID_REQUEST, GRID_SUCCESS, GRID_FAILURE } from '../actions/grid'

let startingState = initialState.status
if (window) {
  let prevState = localStorage['my-save-key'] ? JSON.parse(localStorage['my-save-key']) : undefined
  startingState = prevState ? prevState.status : initialState.status
}

const status = (state = startingState, action) => {
  switch (action.type) {
    case GRID_REQUEST:
      return Object.assign({}, state, {
        fetching: action.payload,
        error: ''
      })
    case GRID_SUCCESS:
      return Object.assign({}, state, {
        fetching: action.meta.fetching,
        error: ''
      })
    case GRID_FAILURE:
      return Object.assign({}, state, {
        fetching: action.meta.fetching,
        error: action.error
      })
    case 'UPLOAD_REQUEST':
      return Object.assign({}, state, {
        isUploading: true,
        isUploaded: false,
        currentFileUploading: action.payload.file
      })
    case 'UPLOAD_CANCEL':
      return Object.assign({}, state, {
        isUploading: false,
        isUploaded: false,
        currentFileUploading: ''
      })
    case 'UPLOAD_SUCCESS':
      return Object.assign({}, state, {
        isUploading: false,
        isUploaded: true,
        currentPhotoIdToUpdateData: action.payload.photoId,
        currentFileUploading: ''
      })
    case 'UPLOAD_FAILURE':
      return Object.assign({}, state, {
        isUploading: false,
        isUploaded: false,
        currentFileUploading: '',
        message: action.payload.message
      })
    case 'TOGGLE_DROP_WINDOW':
      return Object.assign({}, state, {
        isDropOpen: !state.isDropOpen,
      })
    default:
      return state
  }
}

export default status
