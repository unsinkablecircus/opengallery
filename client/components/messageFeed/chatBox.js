import React from 'react'
import TextField from 'material-ui/lib/text-field'



export default class ChatBox extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const messageContainer = document.getElementsByClassName('messageModalContainer')[0];
    if(messageContainer.scrollHeight > messageContainer.clientHeight) {
      messageContainer.scrollTop = messageContainer.scrollHeight - messageContainer.clientHeight;
    }
  }

  render(){
  let { person_name, username, id, textModalField, editInput, messages } = this.props;
    return (
      <div>
        <div className='messageModalContainer' style={{height: '300px', overflow:'scroll'}}>
            {messages.map( (message, index) => {
              const backgroundColor = message.sender_id === id ? 'rgba(63, 191, 191, 0.3)' : 'rgba(0,0,0,0.07)'
              const sender = message.sender_id === id ? username : person_name;

              return (
                <div
                  style = {{ backgroundColor }}
                  className = 'messageModal'
                  key = {index}
                >
                { sender + ': ' + message.message }
                </div>
              )
            })}
          </div>
          <TextField
            style = {{ marginTop: '20px'}}
            multiLine={ true }
            value = {textModalField.input}
            onChange={ event => {editInput(event.target.value)} }
            hintText='Message'
            fullWidth={ true }
          />
      </div>
    )
  }


}