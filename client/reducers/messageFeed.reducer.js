import { initialState } from '../../test/initialState'

let prevState = localStorage['my-save-key'] ? JSON.parse(localStorage['my-save-key']) : undefined;
const startingState = prevState ? prevState.messageFeed : initialState.messageFeed;



const messageFeed = (state=startingState, action) => {
  switch (action.type) {
    case 'SUBMIT_MESSAGE':
    console.log( 'action payload', action.payload)
      return Object.assign({}, state, {
        messages: action.payload
      })
    case 'UPDATE_CONVERSATIONS':
      return Object.assign({}, state, {
        conversations: action.payload.conversations 
      })
    case 'SET_CURRENT_CONVERSATION':
      // reset the messages, change person_name, change currentConversation
      return Object.assign({}, state, {
        currentConversation: action.payload.conversation_id,
        person_username: action.payload.username,
        person_id: action.payload.user_id,
        messages: action.payload.messages
      })
    default:
      return state;

  }
}


export default messageFeed; 