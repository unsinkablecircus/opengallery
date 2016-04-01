import { connect } from 'react-redux';
import User from '../components/user/User';
import { fetchConversations, fetchMessages, fetchConversation, toggleMessageModal } from '../actions/messageFeed.actions'
import { SaveChanges, switchEditMode, switchDeleteMode, fetchUserInfo, DeletePhotos } from '../actions/user';

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
  let photosToBeDeleted = [];

  return {
    switchEditMode: () => {
      dispatch(switchEditMode());
    },
    switchDeleteMode: () => {
      dispatch(switchDeleteMode());
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
    },

    deletePhotos: () => {
      if(photosToBeDeleted.length > 0){
        dispatch(DeletePhotos(photosToBeDeleted));
      }
      dispatch(switchDeleteMode());
    },
    addPhotoToBeDeleted: (photoId) => {
      photosToBeDeleted.push(photoId);
    }
  }
}

const container = connect(
  mapStateToProps,
  mapDispatchToProps
)(User);

export default container;