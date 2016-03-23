import { initialState } from '../../test/initialState'
import { TOGGLE_GALLERY } from '../actions/gallery'
import { SHOW_WORDMAP, HIDE_WORDMAP } from '../actions/wordmap.actions'

let prevState = localStorage['my-save-key'] ? JSON.parse(localStorage['my-save-key']) : undefined;
const startingState = prevState ? prevState.view : initialState.view;

const view = (state = startingState, action) => {
  switch (action.type) {
    case TOGGLE_GALLERY:
      return Object.assign({}, state, {
        displayGallery: !state.displayGallery
      })
    case SHOW_WORDMAP:
      return Object.assign({}, state, {
        displayWordmap: true
      })
    case HIDE_WORDMAP:
      return Object.assign({}, state, {
        displayWordmap: false
      })
    case 'TOGGLE_PHOTOUPLOAD_MODAL':
      return Object.assign({}, state, {
        isUploadModalOpen: !state.isUploadModalOpen
      })
    default:
      return state
  }
}

export default view
