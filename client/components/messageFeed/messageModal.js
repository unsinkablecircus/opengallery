import Dialog from 'material-ui/lib/dialog'
import React from 'react'
import FlatButton from 'material-ui/lib/flat-button'
import TextField from 'material-ui/lib/text-field'
import moment from 'moment'
import ChatBox from './chatBox'

const messageModal = ({
  messages, person_id, person_name, props, currentMessage, index,
  displayMessageModal, toggleMessageModal, username, submitMessage,
  id, currentConversation, editInput, textModalField 
}) => {
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

  const chatBoxProps = { person_name, username, id, textModalField, editInput, messages }

  return (
    <div>
      <Dialog
        title= {  'Conversation With: ' + person_name }
        actions={actions}
        modal={ true }
        open={ displayMessageModal }
      >

        <ChatBox {...chatBoxProps}/>

      </Dialog>
    </div>
  );
}

export default messageModal;

