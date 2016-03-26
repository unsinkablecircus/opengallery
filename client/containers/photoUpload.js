import { connect } from 'react-redux'
import PhotoUpload from '../components/photo/PhotoUpload'
import * as photo from '../actions/upload'

import { toggleUpload } from '../actions/upload'

//import other actions from actions folder

const mapStateToProps = (state) => {
  //update props with relevent states
  return {
    currentUser: state.user.id,
    currentPhotoIdToUpdateData: state.status.currentPhotoIdToUpdateData,
    isUploadModalOpen: state.view.isUploadModalOpen,
    currentFileUploading: state.status.currentFileUploading,
    isDropOpen: state.status.isDropOpen,
    error: state.status.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPhotoDrop: (media) => {
      // console.log("Inside onPhotoDrop function in photoUpload container with photo: ", media, user);
      dispatch(photo.selectPhoto(media));
    },
    onOpenClick: () => {
      // console.log("Inside onOpenClick function in photoUpload container with photo: ", photo);
      dispatch(photo.toggleDropWindow());
      // this.refs.dropzone.open(); // also from dropZone example
    },
    onUploadSuccess: (response) => {
      dispatch(photo.uploadSuccess(response));
    },
    onUploadCancel: () => {
      // console.log("Inside onUploadCancel function in photoUpload container");
      dispatch(photo.uploadCancel());
    },
    onUploadFailure: (error) => {
      dispatch(photo.uploadError(error));
    },
    onUploadButtonClick: (data, media) => {
      console.log("Inside onUploadButtonClick function");
      dispatch(photo.uploadPhoto(data, media));
    },
    closeUploadModal: () => {
      dispatch(toggleUpload());
    }
  }
}

const container = connect(
  mapStateToProps, 
  mapDispatchToProps
)(PhotoUpload);

export default container;
