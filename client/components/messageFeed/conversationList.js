import React from 'react'


class MessageFeed extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.changeRooms(this.props.currentConversation);
  }

  render() {
    let { messages, conversations, fetchMessages, changeRooms }= this.props;

    return (
      <div className='conversationList'>
        { conversations.map((conversation, index) => (
          <div 
            key={index}
            onClick={ () => {
              console.log('click');
              fetchMessages(conversation);
              changeRooms(conversation.id);
            }}
            className='conversation'
          >
            {conversation.username}
          </div>
        ))}
      </div>
    )
  }
    
}


export default MessageFeed







