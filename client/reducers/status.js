import { initialState } from '../../test/initialState'
import { GRID_REQUEST, GRID_SUCCESS, GRID_FAILURE } from '../actions/grid'

const status = (state = initialState.status, action) => {
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
        currentFileUploading: null
      })
    case 'UPLOAD_SUCCESS':
      return Object.assign({}, state, {
        isUploading: false,
        isUploaded: true,
        currentFileUploading: null
      })
    case 'UPLOAD_FAILURE':
      return Object.assign({}, state, {
        isUploading: false,
        isUploaded: false,
        currentFileUploading: null,
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
