import React from 'react'
import MessageModal from '../../containers/messageModal.container'


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
          onClick={ () => {
            toggleMessageModal(index);
          }}
        >
          {message}
        </div>
      ))}
      <MessageModal foo={'bar'}/>
    </div>
  )
}




export default MessageFeed







