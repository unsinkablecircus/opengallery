import { initialState } from '../../test/initialState'

let startingState = initialState.user;

var isNode = new Function("try {return this===global;}catch(e){return false;}");

if (isNode() !== true) {
  let prevState = localStorage['my-save-key'] ? JSON.parse(localStorage['my-save-key']) : undefined;
  startingState = prevState ? prevState.user : initialState.user;
}

const user = (state=startingState, action) => {
  switch (action.type) {
    case 'STORE_USER_DATA':
      return Object.assign({}, state, action.payload)
    case 'SWITCH_EDIT_MODE':
      return Object.assign({}, state, {
        editMode: !state.editMode
      })
    case 'SWITCH_DELETE_MODE':
      return Object.assign({}, state, {
        deleteMode: !state.deleteMode
      })
    default:
      return state;
  }
};

export default user;