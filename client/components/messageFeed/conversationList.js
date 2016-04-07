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

    // socket.emit('createRoom', 'roomies4lyfe');
    this.socket.on('message', function(msg) {
      console.log('msg', msg);
    })
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  render() {
    let { messages, conversations, fetchMessages }= this.props;


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
    
}


export default MessageFeed







