import MessageFeed from '../components/messageFeed/messageFeed.js'
import { connect } from 'react-redux'
import  { toggleMessageModal, fetchMessages } from '../actions/messageFeed.actions'


console.log(MessageFeed);
const mapStateToProps = (state) => {
  return {
    messages: state.messageFeed.messages,
    conversations: state.messageFeed.conversations
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleMessageModal: (index) => {
      dispatch(toggleMessageModal());
    },
    fetchMessages: (conversation_id) => {
      dispatch(fetchMessages(conversation_id));
    }
  }
}





const container = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageFeed);

export default container