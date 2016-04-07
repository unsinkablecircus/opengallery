import React from 'react'
import io from 'socket.io-client'


class MessageFeed extends React.Component {

  constructor(props) {
    super(props);

    this.socket = io();
  }

  componentWillMount() {

    // this.socket.on('connect', function() {
    //   console.log('hello world');
    // })
    this.props.changeRooms(this.props.currentConversation);
    // this.socket.on('message', function(msg) {
    //   // append to messages.
    //   console.log('msg', msg);
    // })
  }

  componentWillUnmount() {
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
              // this.socket.disconnect();
              // this.socket = io();
              // this.socket.emit('createRoom', conversation.id);

              // this.socket.on('message', function(message) {
              //   updateMessage(message);
              // })
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







