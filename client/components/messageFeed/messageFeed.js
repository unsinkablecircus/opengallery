import React from 'react'

const MessageFeed = ({
  messages,
  conversations,
  fetchMessages  
}) => {

  return (
    <div className='conversationList'>
      Talk To: 
      { conversations.map((conversation, index) => (
        <div 
          key={index}
          onClick={ () => {
            fetchMessages(conversation);
          }}
          className='conversation'
        >
          {conversation.username}
        </div>
      ))}
    </div>
  )
}

export default MessageFeed







