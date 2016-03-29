import React from 'react'

const MessageFeed = ({
  messages
}) => {
  console.log('messages', messages);
  return (
    <div>
      { messages.map((message) => (
        <div> {message} </div>
      ))}

    </div>
  )
}




export default MessageFeed







