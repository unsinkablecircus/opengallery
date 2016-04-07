import MessageFeed from '../components/messageFeed/conversationList.js'
import { connect } from 'react-redux'
import  { fetchMessages } from '../actions/messageFeed.actions'


const mapStateToProps = (state) => {
  return {
    messages: state.messageFeed.messages,
    conversations: state.messageFeed.conversations
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMessages: (conversation) => {
      dispatch(fetchMessages(conversation.id, conversation.username, conversation.user_id));
    }
  }
}

const container = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageFeed);

export default container