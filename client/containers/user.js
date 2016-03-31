import { connect } from 'react-redux';
import User from '../components/user/User';
<<<<<<< 804ab17d1221ce49334fb26d7f9e261ab207028a
import { SaveChanges, switchEditMode, fetchUserInfo } from '../actions/user';
<<<<<<< 548023de9598ea9ae8fbe4e3d965f4c52ce1b2a8
import { fetchConversations, fetchMessages, fetchConversation, toggleMessageModal } from '../actions/messageFeed.actions'

=======
import { fetchConversations } from '../actions/messageFeed.actions'
=======
import { SaveChanges, switchEditMode, fetchUserInfo, DeletePhotos } from '../actions/user';
>>>>>>> Create function in user container to dipatch deletePhotos function
>>>>>>> Create function in user container to dipatch deletePhotos function

const mapStateToProps = (state, ownProps) => {
  return {
    selfUsername: state.user.username,
    self_id: state.user.id,
    artist: state.artist,
    editMode: state.user.editMode,
    deleteMode: state.user.deleteMode,
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
    toggleMessageModal: (self_id) => {
      dispatch(toggleMessageModal(self_id));
      dispatch(fetchConversations(self_id));
    },
    updateField: (field, value) => {
      dispatch({
        type: 'EDIT_PROFILE_INFORMATION',
        payload: {
          field: field,
          value: value
        }
      })
    deletePhotos: (photos) => {
      dispatch(deletePhotos(photos));
    }
  }
}

const container = connect(
  mapStateToProps,
  mapDispatchToProps
)(User);

export default container;