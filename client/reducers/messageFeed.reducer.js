import { initialState } from '../../test/initialState'

let prevState = localStorage['my-save-key'] ? JSON.parse(localStorage['my-save-key']) : undefined;
const startingState = prevState ? prevState.messageFeed : initialState.messageFeed;



const messageFeed = (state=startingState, action) => {

  switch (action.type) {
    case 'SUBMIT_MESSAGE':
      // this should be called when you send in a message, so that it 
      // can be updated in real time.
      return Objec.assign({}, state, action.paylaod)
    case 'FETCH_MESSAGES':
      // this should be called when we get the messages back from the server
      return Object.assign({}, state, action.payload)
    default:
      return state;

  }
}


export default messageFeed; 