import Dialog from 'material-ui/lib/dialog'
import React from 'react'
import FlatButton from 'material-ui/lib/flat-button'
import TextField from 'material-ui/lib/text-field'
import moment from 'moment'

const messageModal = ({
  messages,
  person_id,
  person_name,
  props,
  currentMessage,
  index,
  displayMessageModal,
  toggleMessageModal,
  username,
  submitMessage,
  id,
  currentConversation,
  editInput,
  textModalField
}) => {

  let textFieldMessage;
  const textField = (
    <TextField
      multiLine={ true }
      ref = { (node) => { textFieldMessage = node } }
    />
  )

  const actions = [
    <FlatButton
      label="Send"
      primary={true}
      onTouchTap={ () => {
        const createdAt = moment()._d.toLocaleDateString() + ' ' + moment()._d.toLocaleTimeString();
        submitMessage(
          id,
          person_id,
          textModalField.input,
          createdAt,
          currentConversation
        )
      }}
    />,
    <FlatButton
      label="Close"
      onTouchTap={ toggleMessageModal }
    />
  ];

  return (
    <div>
      <Dialog
        title= {  'Conversation With: ' + person_name }
        actions={actions}
        modal={ true }
        open={ displayMessageModal }
      >
        <div className='messageModalContainer' style={{height: '300px', overflow:'scroll'}}>
          {messages.map( (message, index) => {
            let style = {
              borderRadius: '10px',
              height: '25px',
              margin: '4px 0px',
              padding: '10px 0px 5px 10px',
              lineHeight: '25px',
              fontSize: '20px'
            }
            style.backgroundColor = message.sender_id === id ? 'rgba(63, 191, 191, 0.3)' : 'rgba(0,0,0,0.07)'

            const sender = message.sender_id === id ? username : person_name;

            return (
              <div
                style = {style}
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
      <div> {index + ': ' + currentMessage} </div>
      </Dialog>
    </div>
  );
}

export default messageModal;

