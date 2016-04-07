import { connect } from 'react-redux';
import User from '../components/user/User';
import * as gallery from '../actions/gallery'
import { fetchConversations, fetchMessages, fetchConversation, toggleMessageModal } from '../actions/messageFeed.actions'
import { SaveChanges, switchEditMode, switchDeleteMode, fetchUserInfo, DeletePhotos, addToBeDeletedPhoto } from '../actions/user';

const mapStateToProps = (state, ownProps) => {
  return {
    tile: state.media.tile,
    selfUsername: state.user.username,
    self_id: state.user.id,
    artist: state.artist,
    editMode: state.user.editMode,
    deleteMode: state.user.deleteMode,
    photosToBeDeleted: state.user.photosToBeDeleted,
    location: ownProps,
    formData: state.form.profileInformation
  }
}

const mapDispatchToProps = (dispatch) => {

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
      console.log('updatefield', field, value);
      dispatch({
        type: 'EDIT_PROFILE_INFORMATION',
        payload: {
          field: field,
          value: value
        }
      })
    },
    deletePhotos: (photos) => {
      dispatch(DeletePhotos(photos));
      dispatch(switchDeleteMode());
    },
    unstagePhotos: () => {
      dispatch(unstagePhotosToBeDeleted());
    },
    addPhotoToBeDeleted: (photoId) => {
      dispatch(addToBeDeletedPhoto(photoId));
      // dispatch(gallery.toggleView(tile));
    }
  }
}

const container = connect(
  mapStateToProps,
  mapDispatchToProps
)(User);

export default container;