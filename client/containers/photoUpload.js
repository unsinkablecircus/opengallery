import { connect } from 'react-redux'
import PhotoUpload from '../components/photo/PhotoUpload'
import * as photo from '../actions/upload.js'
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
    onPhotoDrop: (media, user) => {
      console.log("Inside onPhotoDrop function in photoUpload container with photo: ", media, user);
      dispatch(photo.uploadRequest(media));
      //needs to dispatch a current file state?
      dispatch(photo.UploadPhoto(media, user));
      // from dropZone example
      // this.setState({
      //   files: files
      // });
    },
    onOpenClick: () => {
      // from dropZone example
      console.log("Inside onOpenClick function in photoUpload container with photo: ", photo);
      dispatch(photo.toggleDropWindow());
      // this.refs.dropzone.open(); // also from dropZone example
    },
    onUploadSuccess: (response) => {
      dispatch(photo.uploadSuccess(response));
    },
    onUploadCancel: () => {
      console.log("Inside onUploadCancel function in photoUpload container");
      dispatch(photo.uploadCancel());
    },
    onUploadFailure: (error) => {
      dispatch(photo.uploadError(error));
    },
    onUploadButtonClick: (metaData, mediaId) => {
      dispatch(photo.uploadRequest());
      photo.UploadMetaData(metaData, mediaId);
    },
  }
}

const container = connect(
  mapStateToProps, 
  mapDispatchToProps
)(PhotoUpload);

export default container;
