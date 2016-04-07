import MessageFeed from '../components/messageFeed/conversationList.js'
import { connect } from 'react-redux'
import  { fetchMessages, updateMessage } from '../actions/messageFeed.actions'


const mapStateToProps = (state, ownProps) => {
  return {
    changeRooms: ownProps.changeRooms,
    messages: state.messageFeed.messages,
    conversations: state.messageFeed.conversations,
    currentConversation: state.messageFeed.currentConversation

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMessages: (conversation) => {
      dispatch(fetchMessages(conversation.id, conversation.username, conversation.user_id));
    },
    updateMessage: (message) => {
      dispatch(updateMessage(message));
    }
  }
}

const container = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageFeed);

export default container