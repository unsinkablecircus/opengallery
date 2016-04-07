import React from 'react'

const MessageFeed = ({
  messages,
  conversations,
  fetchMessages,
  socket 
}) => {

  socket.emit('createRoom', 'roomies4lyfe');

  socket.on('message', function(msg) {
    console.log('msg', msg);
  })

  return (
    <div className='conversationList'>
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







