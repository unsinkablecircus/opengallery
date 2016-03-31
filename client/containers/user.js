import { connect } from 'react-redux';
import User from '../components/user/User';
import { SaveChanges, switchEditMode, fetchUserInfo } from '../actions/user';
import { fetchConversations, fetchMessages, fetchConversation } from '../actions/messageFeed.actions'


const mapStateToProps = (state, ownProps) => {
  return {
    selfUsername: state.user.username,
    self_id: state.user.id,
    artist: state.artist,
    editMode: state.user.editMode,
    location: ownProps,
    formData: state.form.profileInformation
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    switchEditMode: () => {
      dispatch(switchEditMode());
    },
    saveChanges: (values) => {
      dispatch(SaveChanges(values));
    },
    fetchConversation: (self_id, user_id, username) => {
      dispatch(fetchConversation(self_id, user_id, username))
    },
    toggleMessageModal: () => {
      dispatch({
        type: 'TOGGLE_MESSAGE_MODAL'
      })
    },
    updateField: (field, value) => {
      dispatch({
        type: 'EDIT_PROFILE_INFORMATION',
        payload: {
          field: field,
          value: value
        }
      })
    }
  }
}

const container = connect(
  mapStateToProps,
  mapDispatchToProps
)(User);

export default container;