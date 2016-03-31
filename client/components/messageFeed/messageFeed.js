import React from 'react'
import MessageModal from '../../containers/messageModal.container'

const MessageFeed = ({
  messages,
  conversations,
  toggleMessageModal,
  fetchMessages  
}) => {

  return (
    <div >
      { conversations.map((conversation, index) => (
        <div 
          key={index}
          onClick={ () => {
            fetchMessages(conversation);
            toggleMessageModal(index);
          }}
          className='conversation'
        >
          {'Conversation with: ' + conversation.username}
        </div>
      ))}
      <MessageModal/>
    </div>
  )
}

export default MessageFeed







