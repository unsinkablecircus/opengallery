


export const toggleMessageModal = () => {
  return {
    type: 'TOGGLE_MESSAGE_MODAL'
  };
}


const updateMessages = () => {

}

const messageError = () => {

}



export const submitMessage = (user1_id, user2_id, message, time) => {
   let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `user1_id=${user1_id}&user2_id=${user2_id}&message=${message}&time=${time}`
  }
  
  return dispatch => {
    // We dispatch requestSignup to kickoff the call to the API
    return fetch(`http://${window.location.hostname}:${window.location.hostname === '54.153.9.57' ? '80' : '8000'}/api/messages`, config)
      .then( response => {
        if ( !response.ok ) {
          dispatch(messageError('cannot submit message'));
          return Promise.reject('cannot submit message');
        }
        return response.json();
      })
      .then( (data) => {
        dispatch(updateMessages);
        console.log('message submitted');
      })
      .catch( err => console.log("Error: ", err) )
  }
}