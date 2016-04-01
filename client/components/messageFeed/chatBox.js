import React from 'react'
import TextField from 'material-ui/lib/text-field'



export default class ChatBox extends React.Component {
  componentDidUpdate() {
    // set the scroll to the bottom to show the most recent messages
    const messageContainer = document.getElementsByClassName('messageBox')[0];
    if(messageContainer.scrollHeight > messageContainer.clientHeight) {
      messageContainer.scrollTop = messageContainer.scrollHeight - messageContainer.clientHeight;
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    // Update only when a message is submitted, not when state changes with keystrokes
    return this.props.person_username !== nextProps.person_username;
  }

  render(){
  let { person_username, username, id, textModalField, editInput, messages } = this.props;
    return (
      <div className='messageModalContainer'>
        <div  className='messageBox'>
            {messages.map( (message, index) => {

              const backgroundColor = message.sender_id === id ? 'rgba(63, 191, 191, 0.3)' : 'rgba(0,0,0,0.07)'
              const sender = message.sender_id === id ? username : person_username;

              return (
                <div
                  style = {{ backgroundColor }}
                  className = 'message'
                  key = {index}
                >
                { sender + ': ' + message.message }
                </div>
              )
            })}
          </div>
      </div>
    )
  }


}