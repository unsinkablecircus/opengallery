import React from 'react'
import io from 'socket.io-client'


class MessageFeed extends React.Component {

  constructor(props) {
    super(props);

    this.socket = io();
  }

  componentWillMount() {
    this.socket.on('connect', function() {
      console.log('hello world');
    })

    this.socket.emit('createRoom', 'roomies4lyfe');
    this.socket.on('message', function(msg) {
      // append to messages.
      console.log('msg', msg);
    })
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  render() {
    let { messages, conversations, fetchMessages }= this.props;

    const conversationId = conversations[0].id;

    // clicking another conversation, destroy this.socket, recreate a new one


    return (
      <div className='conversationList'>
        { conversations.map((conversation, index) => (
          <div 
            key={index}
            onClick={ () => {
              console.log('click');
              fetchMessages(conversation);
              this.socket.disconnect();
              this.socket = io();
              this.socket.emit('createRoom', conversation.id);
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







