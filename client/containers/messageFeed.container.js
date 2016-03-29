import MessageFeed from '../components/messageFeed/messageFeed.js'
import { connect } from 'react-redux'


console.log(MessageFeed);
const mapStateToProps = (state) => {
  return {
    messages: state.messageFeed.messages
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleMessageModal: (index) => {
      // toggle modal
      dispatch({
        type: 'TOGGLE_MESSAGE_MODAL'
      });
      // change the current message on message state (integer)
      dispatch({
        type: 'SET_CURRENT_MESSAGE',
        payload: index
      });
    }
  }
}





const container = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageFeed);

export default container