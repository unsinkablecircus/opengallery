import { initialState } from '../../test/initialState'

let startingState = initialState.user;

if (!module) {
  let prevState = localStorage['my-save-key'] ? JSON.parse(localStorage['my-save-key']) : undefined;
  startingState = prevState ? prevState.user : initialState.user;
}

const user = (state=startingState, action) => {
  switch (action.type) {
    case 'STORE_USER_DATA':
    console.log('action payload', action.payload);
      return Object.assign({}, state, action.payload)
    case 'SWITCH_EDIT_MODE':
      return Object.assign({}, state, {
        editMode: !state.editMode
      })
    default:
      return state;
  }
};

export default user;