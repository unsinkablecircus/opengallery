import { initialState } from '../../test/initialState'
import { GRID_FILTER, GRID_REQUEST, GRID_SUCCESS, GRID_FAILURE } from '../actions/grid'

const grid = (state = initialState.grid, action) => {
  switch (action.type) {
    case GRID_FILTER:
      return Object.assign({}, state, {
        filter: action.payload
      })
    case GRID_REQUEST:
      return Object.assign({}, state, {
        fetching: action.payload
      })
    case GRID_SUCCESS:
      return Object.assign({}, state, {
        fetching: action.meta.fetching,
        error: action.error,
        tiles: action.payload
      })
    case GRID_FAILURE:
      return Object.assign({}, state, {
        fetching: action.meta.fetching,
        error: action.error
      })
    default:
      return state
  }
}

export default grid
