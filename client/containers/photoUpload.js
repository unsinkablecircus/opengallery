import { connect } from 'react-redux'
import PhotoUpload from '../components/photo/PhotoUpload'
import * as photo from '../actions/upload'

import { toggleUpload } from '../actions/upload'

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.id,
    currentPhotoIdToUpdateData: state.status.currentPhotoIdToUpdateData,
    isUploadModalOpen: state.view.isUploadModalOpen,
    isUploading: state.status.isUploading,
    currentFileUploading: state.status.currentFileUploading,
    isDropOpen: state.status.isDropOpen,
    error: state.status.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPhotoDrop: (media) => {
      dispatch(photo.selectPhoto(media));
    },
    onRemoveCurrentPhoto: () => {
      dispatch(photo.removePhoto());
    },
    onOpenClick: () => {
      dispatch(photo.toggleDropWindow());
    },
    onUploadSuccess: (response) => {
      dispatch(photo.uploadSuccess(response));
    },
    onUploadFailure: (error) => {
      dispatch(photo.uploadError(error));
    },
    onUploadButtonClick: (data, media) => {
      dispatch(photo.uploadPhoto(data, media));
    },
    closeUploadModal: () => {
      dispatch(toggleUpload());
      dispatch(photo.removePhoto());
    }
  }
}

const container = connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoUpload);

export default container;
