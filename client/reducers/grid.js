import { GRID_REQUEST, GRID_SUCCESS, GRID_FAILURE } from '../actions/grid'

const grid = (state, action) => {
  switch (action.type) {
    case GRID_REQUEST:
      return Object.assign({}, state, {
        isFetchingMedia: action.meta.fetching
      })
    case GRID_SUCCESS:
      return Object.assign({}, state, {
        isFetchingMedia: action.meta.fetching,
        errorFetchingMedia: '',
        ...action.payload
      })
    case GRID_FAILURE:
      return Object.assign({}, state, {
        isFetchingMedia: action.meta.fetching,
        errorFetchingMedia: action.error
      })
    default:
      return {
        isFetchingMedia: false,
        errorFetchingMedia: '',
        grid: [],
        media: {},
        feedback: {}
      }
  }
}

export default grid
