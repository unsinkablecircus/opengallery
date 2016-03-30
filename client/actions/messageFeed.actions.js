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

const setCurrentConversation = (conversation, messages) => {
  return {
    type: 'SET_CURRENT_CONVERSATION',
    payload: {
      conversation: conversation,
      messages: messages
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
        dispatch(updateMessage(message[0]));

        // after submitting message, make sure that the scroll bar is at the bottom to show the most recent message
        const messageContainer = document.getElementsByClassName('messageModalContainer')[0];
        if(messageContainer.scrollHeight > messageContainer.clientHeight) {
          messageContainer.scrollTop = messageContainer.scrollHeight - messageContainer.clientHeight;
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
      .catch( err => {
        console.log("Error: ", err);
        dispatch(messageError(err));
      })
  }
}

export const fetchMessages = (conversation) => {
  const conversation_id = conversation.id;
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
          dispatch(setCurrentConversation(conversation, messages));
        })
        .catch( err => {
          console.log("Error: ", err);
          dispatch(messageError(err));
        })
  }
}




















