import React from 'react'

const MessageFeed = ({
  messages,
  toggleMessageModal
}) => {
  console.log('messages', messages);
  return (
    <div>
      { messages.map((message, index) => (
        <div 
          key={index}
          onClick={toggleMessageModal}
        >
          {message}
        </div>
      ))}

    </div>
  )
}




export default MessageFeed







