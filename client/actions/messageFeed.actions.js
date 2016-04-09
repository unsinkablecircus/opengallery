
export const toggleMessageModal = (self_id) => {
  // whenever you pop open the modal, you want to fetch the conversations and save them to state
  return {
    type: 'TOGGLE_MESSAGE_MODAL'
  };
}

export const updateMessage = (message) => {
  return {
    type: 'UPDATE_MESSAGE',
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

const setCurrentConversation = (conversation_id, username, user_id, messages) => {
  return {
    type: 'SET_CURRENT_CONVERSATION',
    payload: {
      conversation_id,
      username,
      user_id,
      messages
    }
  }
}

const messageError = (err) => {
  return {
    type: 'MESSAGE_ERROR',
    payload: err
  }
}

export const submitMessage = (user1_id, user2_id, message, createdAt, currentConversation) => {
   let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `user1_id=${user1_id}&user2_id=${user2_id}&message=${message}&createdAt=${createdAt}&currentConversation=${currentConversation}`
  }
  
  return dispatch => {
    var host = window.location.hostname === '54.153.9.57' || window.location.hostname === 'opengallery.io' ? '54.153.9.57' : window.location.hostname;
    return fetch(`http://${host}:${host === '54.153.9.57' ? '80' : '8000'}/api/message/submitMessage`, config)
      .then( response => {
        if ( !response.ok ) {
          return Promise.reject('cannot submit message');
        }
      })
      .catch( err => {
        console.log("Error: ", err);
        dispatch(messageError(err));
      })
  }
}

export const fetchConversations = (self_id) => {
let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `self_id=${self_id}`
  }
  return dispatch => {
    // We dispatch requestSignup to kickoff the call to the API
    var host = window.location.hostname === '54.153.9.57' || window.location.hostname === 'opengallery.io' ? '54.153.9.57' : window.location.hostname;
    return fetch(`http://${host}:${host === '54.153.9.57' ? '80' : '8000'}/api/message/fetchConversations`, config)
      .then( response => {
        if ( !response.ok ) {
          // dispatch(messageError('cannot submit message'));
          return Promise.reject('cannot submit message');
        }
        return response.json();
      })
      .then( (conversations) => {
        dispatch(updateConversations(conversations));
      })
      .catch( err => {
        console.log("Error: ", err);
        dispatch(messageError(err));
      })
  }
}



//conversation.id, conversation.username, conversation.user_id
export const fetchMessages = (conversation_id, username, user_id) => {
  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `conversation_id=${conversation_id}`
  }
  return dispatch => {
    // We dispatch requestSignup to kickoff the call to the API
    var host = window.location.hostname === '54.153.9.57' || window.location.hostname === 'opengallery.io' ? '54.153.9.57' : window.location.hostname;
    return fetch(`http://${host}:` +
                 `${host === '54.153.9.57' ? '80' : '8000'}` +
                 `/api/message/fetchMessages`, config)
      .then( response => {
        if ( !response.ok ) {
          // dispatch(messageError('cannot submit message'));
          return Promise.reject('cannot submit message');
        }
        return response.json();
      })
      .then( (messages) => {
        dispatch(setCurrentConversation(conversation_id, username, user_id, messages));
      })
      .catch( err => {
        console.log("Error: ", err);
        dispatch(messageError(err));
      })
  }
}

export const fetchConversation = (self_id, user_id, username) => {
 let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `self_id=${self_id}&user_id=${user_id}`
  }
  return dispatch => {
    var host = window.location.hostname === '54.153.9.57' || window.location.hostname === 'opengallery.io' ? '54.153.9.57' : window.location.hostname;
    return fetch(`http://${host}:` +
                 `${host === '54.153.9.57' ? '80' : '8000'}` +
                 `/api/message/fetchConversation`, config)
    .then( response => {
      if ( !response.ok) {
        return Promise.reject('cannot fetch conversation')
      }
      return response.json();
    })
    .then( (payload) => {
      // If no messages exist in the current conversation, 
      // CurrentMessages will contain one row with the conversation id, all other values null
      const currentMessages =  payload.currentMessages[0].sender_id === null ? [] : payload.currentMessages;
      dispatch(setCurrentConversation(payload.currentMessages[0].id, username, user_id, currentMessages));
      dispatch(updateConversations(payload.allConversations));
    })
    .catch( (err) => {
      console.log('err', err);
    })
  }
}