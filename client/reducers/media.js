import update from 'react-addons-update'
import { initialState } from '../../test/initialState'

import { GRID_REQUEST, GRID_SUCCESS, GRID_FAILURE, SHOW_EMPTY_MEDIA, CLEAR_MEDIA } from '../actions/grid'
import { SHOW_NEXT, SHOW_PREV, TOGGLE_GALLERY } from '../actions/gallery'
import { ADD_TO_WORDMAP, UPDATE_WORDMAP } from '../actions/wordmap.actions'

import * as wordmap from './wordmap.reducer'

let startingState = initialState.media;
const isNode = new Function("try {return this===global;}catch(e){return false;}");

if (isNode() !== true) {
  let prevState = localStorage['my-save-key'] ? JSON.parse(localStorage['my-save-key']) : undefined;
  startingState = prevState ? prevState.media : initialState.media;
}

const media = (state = startingState, {type, payload, meta}) => {
  const len = state.grid.length
  const idx = state.tile

  switch (type) {
    case GRID_SUCCESS:
      return Object.assign({}, state, {
        grid: state.grid.concat(payload.grid),
        data: Object.assign({}, state.data, payload.data),
        page: state.page + 1,
        total_photos: payload.total_photos
      })

    case CLEAR_MEDIA:
      return Object.assign({}, state, {
        grid: [],
        data: [],
        page: 0,
        total_photos: undefined,
        tile: 0
      })
    case SHOW_EMPTY_MEDIA:
      return Object.assign({}, state, {
        grid: [],
        data: [],
        page: 0,
        total_photos: 0,
        tile: 0
      })

    case TOGGLE_GALLERY:
      return Object.assign({}, state, {
        tile: payload
      })

    case SHOW_NEXT:
      return Object.assign({}, state, {
        tile: idx + 1 >= len ? len - 1 : idx + 1
      })

    case SHOW_PREV:
      return Object.assign({}, state, {
        tile: idx - 1 < 0 ? 0 : idx - 1
      })

    case UPDATE_WORDMAP:
      wordmap.addFeedback(state, { payload, ...meta })
      break

    default:
      return state
  }
}

export default media
