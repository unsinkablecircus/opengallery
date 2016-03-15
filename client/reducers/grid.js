import { GRID_REQUEST, GRID_SUCCESS, GRID_FAILURE } from './actions/grid'

const grid = (state, action) => {
  switch (action.type) {
    case GRID_REQUEST:
      return Object.assign({}, state, {
        isFetchingMedia: true
      })
    case GRID_SUCCESS:
      return Object.assign({}, state, {
        isFetchingMedia: false,
        errorFetchingMedia: '',
        grid: action.grid,
        media: action.media,
        feedback: action.feedback
      })
    case GRID_FAILURE:
      return Object.assign({}, state, {
        isFetchingMedia: false,
        errorFetchingMedia: action.error
      })
    default:
      return {
        isFetchingMedia: false,
        errorFetchingMedia: '',
        grid: action.media,
        media: action.media,
        feedback: action.feedback
      }
  }
}

export default grid
