import { SHOW_NEXT, SHOW_PREV, TOGGLE_MAP } from '../actions/gallery'

const initialState = {
  currentTile: 0,
  displayGallery: false,
  grid: [1, 2, 3]
}

const gallery = (state = initialState, action) => {
  const len = state.grid.length
  const idx = state.currentTile

  switch (action.type) {
    case SHOW_NEXT:
      return Object.assign({}, state, {
        currentTile: idx + 1 >= len ? 0 : idx + 1
      })
    case SHOW_PREV:
      return Object.assign({}, state, {
        currentTile: idx - 1 < 0 ? len - 1 : idx - 1
      })
    case TOGGLE_MAP:
      return Object.assign({}, state, {
        displayGallery: !state.displayGallery
      })
    default:
      return initialState
  }
}

export default gallery
