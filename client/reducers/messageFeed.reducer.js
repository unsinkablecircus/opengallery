import { initialState } from '../../test/initialState'

let prevState = localStorage['my-save-key'] ? JSON.parse(localStorage['my-save-key']) : undefined;
const startingState = prevState ? prevState.messageFeed : initialState.messageFeed;



const messageFeed = (state=startingState, action) => {

  switch (action.type) {
    case 'SUBMIT_MESSAGE':
      return Object.assign({}, state, {
        messages: [
          ...state.messages,
          action.payload
        ]
      })
    case 'UPDATE_CONVERSATIONS':
      return Object.assign({}, state, {
        conversations: action.payload.conversations 
      })
    case 'FETCH_MESSAGES':
      // this should be called when we get the messages back from the server
      return Object.assign({}, state, action.payload)
    c
    default:
      return state;

  }
}


export default messageFeed; 