import { initialState } from '../../test/initialState'
import { TOGGLE_SIGNOUT } from '../actions/nav.actions'

let startingState = initialState.nav;

var isNode = new Function("try {return this===global;}catch(e){return false;}");

if (isNode() !== true) {
  let prevState = localStorage['my-save-key'] ? JSON.parse(localStorage['my-save-key']) : undefined;
  startingState = prevState ? prevState.nav : initialState.nav;
}

const nav = (state = startingState, action) => {
  switch (action.type) {
    case TOGGLE_SIGNOUT:
      return Object.assign({}, state, {
        showSignOut: !state.showSignOut
      })
    default:
      return state
  }
}

export default nav
