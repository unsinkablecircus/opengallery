


export const toggleMessageModal = () => {
  return {
    type: 'TOGGLE_MESSAGE_MODAL'
  };
}


const updateMessage = (username, text) => {
  console.log('update message', username, text);
  return {
    type: 'SUBMIT_MESSAGE',
    payload: {
      sender: username,
      text: text
    }
  }
}

const messageError = () => {

}



export const submitMessage = (user1_id, user2_id, message, time, username) => {
   let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `user1_id=${user1_id}&user2_id=${user2_id}&message=${message}&time=${time}`
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
      .then( (data) => {
        console.log('data', data.data);
        dispatch(updateMessage(username, data.data.message));
      })
      .catch( err => console.log("Error: ", err) )
  }
}

export const fetchConversations = (   ) => {
let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `user1_id=${user1_id}&user2_id=${user2_id}&message=${message}&time=${time}`
  }
  
  return dispatch => {
    // We dispatch requestSignup to kickoff the call to the API
    return fetch(`http://${window.location.hostname}:${window.location.hostname === '54.153.9.57' ? '80' : '8000'}/api/message/fetchMessage`, config)
      .then( response => {
        if ( !response.ok ) {
          // dispatch(messageError('cannot submit message'));
          return Promise.reject('cannot submit message');
        }
        return response.json();
      })
      .then( (data) => {
        console.log('data', data);
        // dispatch(updateMessages);
        console.log('message submitted');
      })
      .catch( err => console.log("Error: ", err) )
  }



}