import { initialState } from '../../test/initialState'
import { TOGGLE_DROPDOWN } from '../actions/nav.actions'

let startingState = initialState.status;

var isNode = new Function("try {return this===global;}catch(e){return false;}");

if (isNode() !== true) {
  let prevState = localStorage['my-save-key'] ? JSON.parse(localStorage['my-save-key']) : undefined;
  startingState = prevState ? prevState.status : initialState.status;
}

const status = (state = startingState, action) => {
  switch (action.type) {
    case TOGGLE_DROPDOWN:
      return Object.assign({}, state, {
        showDropdown: !state.showDropdown
      })
    default:
      return state
  }
}

export default status
