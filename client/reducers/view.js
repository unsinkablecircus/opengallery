import { initialState } from '../../test/initialState'
import { TOGGLE_GALLERY } from '../actions/gallery'

const view = (state = initialState.view, action) => {
  switch (action.type) {
    case TOGGLE_GALLERY:
      return Object.assign({}, state, {
        displayGallery: !state.displayGallery
      })
    default:
      return state
  }
}

export default view
