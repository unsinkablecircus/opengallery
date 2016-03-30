import React from 'react'
import MessageModal from '../../containers/messageModal.container'

class MessageFeed extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    // do a fetch to get the conversations
    
  }

  render() {
    let { messages, conversations, toggleMessageModal, fetchMessages } = this.props
    return (
      <div>
        { conversations.map((conversation, index) => (
          <div 
            key={index}
            onClick={ () => {
              // do a fetch here for the messages, in server, using conversation id
              fetchMessages(conversation.id);
              toggleMessageModal(index);
            }}
          >
            {'conversation with: ' + conversation.username}
          </div>
        ))}
        <MessageModal/>
      </div>
    )
  }
}




export default MessageFeed







