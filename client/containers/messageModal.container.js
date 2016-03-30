import messageModal from '../components/messageFeed/messageModal'
import { connect } from 'react-redux'
import  { toggleMessageModal, submitMessage } from '../actions/messageFeed.actions'

const mapStateToProps = (state, props) => {
  return {
    messages: state.messageFeed.messages,
    person_id: state.messageFeed.person_id,
    person_name: state.messageFeed.person_name,
    displayMessageModal: state.view.displayMessageModal,
    username: state.user.username,
    id: state.user.id,
<<<<<<< ba904922153c7cadad5b31c5afe0bf798fcd88f0
    currentConversation: state.messageFeed.currentConversation,
    person_name: state.messageFeed.person_name,
    textModalField: state.form.messageModal
=======
    currentConversation: state.messageFeed.currentConversation
>>>>>>> Refactor how messages appear in the state, and how they are submitted and updated
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleMessageModal: () => {
      dispatch(toggleMessageModal());
    },
    submitMessage: (user1_id, user2_id, message, createdAt, currentConversation) => {
      dispatch(submitMessage(user1_id, user2_id, message, createdAt, currentConversation));
      dispatch({type: 'CLEAR_MESSAGE_MODAL_TEXT_FIELD'})
    },
<<<<<<< ba904922153c7cadad5b31c5afe0bf798fcd88f0
    editInput: value => {
      dispatch({
        type: 'MESSAGE_MODAL_FIELD',
        payload: { input: value }
      })
=======
    submitMessage: (user1_id, user2_id, message, createdAt, currentConversation) => {
      console.log(user1_id, user2_id, message, createdAt, currentConversation)
      dispatch(submitMessage(user1_id, user2_id, message, createdAt, currentConversation))
>>>>>>> Refactor how messages appear in the state, and how they are submitted and updated
    }
  }
}

const container = connect(
  mapStateToProps,
  mapDispatchToProps
)(messageModal)

export default container;
