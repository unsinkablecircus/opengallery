


export const toggleMessageModal = () => {
  return {
    type: 'TOGGLE_MESSAGE_MODAL'
  };
}


const updateMessage = (message) => {
  return {
    type: 'SUBMIT_MESSAGE',
    payload: message
  }
}

const updateConversations = (conversations) => {
  return {
    type: 'UPDATE_CONVERSATIONS',
    payload: {
      conversations: conversations
    }
  }
}

const messageError = () => {

}

export const submitMessage = (user1_id, user2_id, message, createdAt, currentConversation) => {
   let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `user1_id=${user1_id}&user2_id=${user2_id}&message=${message}&createdAt=${createdAt}&currentConversation=${currentConversation}`
  }
  
  return dispatch => {
    // We dispatch requestSignup to kickoff the call to the API
    return fetch(`http://${window.location.hostname}:${window.location.hostname === '54.153.9.57' ? '80' : '8000'}/api/message/submitMessage`, config)
      .then( response => {
        if ( !response.ok ) {
          // dispatch(messageError('cannot submit message'));
          return Promise.reject('cannot submit message');
        }
        return response.json();
      })
      .then( (message) => {
        console.log('message', message[0]);
        dispatch(updateMessage(message[0]));
      })
      .catch( err => console.log("Error: ", err) )
  }
}

export const fetchConversations = (self_id) => {
let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `self_id=${self_id}`
  }
  console.log('fetch convos', self_id);  
  return dispatch => {
    // We dispatch requestSignup to kickoff the call to the API
    return fetch(`http://${window.location.hostname}:${window.location.hostname === '54.153.9.57' ? '80' : '8000'}/api/message/fetchConversations`, config)
      .then( response => {
        if ( !response.ok ) {
          // dispatch(messageError('cannot submit message'));
          return Promise.reject('cannot submit message');
        }
        return response.json();
      })
      .then( (conversations) => {
        console.log('conversations', conversations);
        dispatch(updateConversations(conversations));
      })
      .catch( err => console.log("Error: ", err) )
  }
}

export const fetchMessages = (conversation_id) => {
let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `conversation_id=${conversation_id}`
  }
  return dispatch => {
    // We dispatch requestSignup to kickoff the call to the API
    return fetch(`http://${window.location.hostname}:${window.location.hostname === '54.153.9.57' ? '80' : '8000'}/api/message/fetchMessages`, config)
      .then( response => {
        if ( !response.ok ) {
          // dispatch(messageError('cannot submit message'));
          return Promise.reject('cannot submit message');
        }
        return response.json();
      })
      .then( (messages) => {
        console.log('messages', messages);
        // dispatch(updateConversations(conversations));
      })
      .catch( err => console.log("Error: ", err) )
  }
}




















