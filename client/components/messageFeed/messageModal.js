import Dialog from 'material-ui/lib/dialog'
import React from 'react'
import FlatButton from 'material-ui/lib/flat-button'
import TextField from 'material-ui/lib/text-field'
import moment from 'moment'
import ChatBox from './chatBox'
import ConversationList from '../../containers/messageFeed.container'

const messageModal = ({
  messages, person_id, person_username, props, currentMessage, index,
  displayMessageModal, toggleMessageModal, username, submitMessage,
  id, currentConversation, editInput, textModalField, hideConversationsInMessageModal,
  toggleConversations
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

  const chatBoxProps = { person_username, username, id, textModalField, editInput, messages }

  return (
    <div>
      <Dialog
        actions={actions}
        modal={ true }
        open={ displayMessageModal }
      >
        <div 
          className='messageModalTitle'
        > 
          { person_username }
          <span 
            className='toggleConversation'
            onClick={ toggleConversations}
          > {hideConversationsInMessageModal ? 'show conversations' : 'hide conversations' } </span>
        </div>
        <div className='messageModalBox'>
          <ChatBox {...chatBoxProps}/>
          { hideConversationsInMessageModal ? null : <ConversationList className='conversationList'/> }
        </div>
          <TextField
            style = {{ marginTop: '20px'}}
            multiLine={ true }
            value = {textModalField.input}
            onChange={ event => {editInput(event.target.value)} }
            hintText='Message'
            fullWidth={ true }
          />

      </Dialog>
    </div>
  );
}

export default messageModal;

