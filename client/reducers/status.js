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
    default:
      return state
  }
}

export default status
