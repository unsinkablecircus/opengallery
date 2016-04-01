import { initialState } from '../../test/initialState'

let prevState = localStorage['my-save-key'] ? JSON.parse(localStorage['my-save-key']) : undefined;
const startingState = prevState ? prevState.form : initialState.form;

const form = (state = startingState, action) => {
  switch (action.type) {
    case 'MESSAGE_MODAL_FIELD':
      return Object.assign({}, state, {
        messageModal: {
          input: action.payload.input
        }
      })
    case 'CLEAR_MESSAGE_MODAL_TEXT_FIELD':
      return Object.assign({}, state, {
        messageModal: {
          input: ""
        }
      })
    case 'UPDATE_PROFILE_FORM_AFTER_FETCH':
      return Object.assign({}, state, {
        profileInformation: action.payload
      });
    case 'EDIT_PROFILE_INFORMATION':
      let newProfileInformation = Object.assign({}, state.profileInformation);
      newProfileInformation[action.payload.field] = action.payload.value;

      return Object.assign({}, state, {
        profileInformation: newProfileInformation
      });
    default:
      return state

  }
}

export default form;