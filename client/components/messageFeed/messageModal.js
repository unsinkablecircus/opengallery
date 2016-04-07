import Dialog from 'material-ui/lib/dialog'
import React from 'react'
import FlatButton from 'material-ui/lib/flat-button'
import TextField from 'material-ui/lib/text-field'
import moment from 'moment'
import ChatBox from './chatBox'
import ConversationList from '../../containers/conversationList.container'

import io from 'socket.io-client'


class messageModal extends React.Component {
  constructor(props) {
    super(props);

    this.socket = io();
  }

  changeRooms(conversationId) {
    const props = this.props;
    this.socket.disconnect();
    this.socket = io();
    this.socket.emit('createRoom', conversationId);
    this.socket.on('message', function(message) {
      props.updateMessage(message);
   })
  }


  render() {
    let { messages, person_id, person_username, props, currentMessage, index,
    displayMessageModal, toggleMessageModal, username, submitMessage,
    id, currentConversation, editInput, textModalField, hideConversationsInMessageModal,
    toggleConversations } = this.props;

    const actions = [
        <FlatButton
          label="Send"
          primary={true}
          onTouchTap={ () => {
            const createdAt = moment()._d.toLocaleDateString() + ' ' + moment()._d.toLocaleTimeString();
            // emit some message
            this.socket.emit('sendMessage', {
              conversation_id: currentConversation,
              created_at: createdAt,
              sender_id: id,
              message: textModalField.input,
            })

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
          <div className='messageModalTitle'> 
            { person_username }
            <span className='toggleConversation' onClick={ toggleConversations} > 
              {hideConversationsInMessageModal ? 'show conversations' : 'hide conversations' } 
            </span>
          </div>
          <div className='messageModalBox'>
            <ChatBox {...chatBoxProps}/>
            { hideConversationsInMessageModal ? null : <ConversationList changeRooms={(room) => { this.changeRooms(room) }}/> }
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
}

export default messageModal;

