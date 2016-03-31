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
    default:
      return state

  }
}

export default form;