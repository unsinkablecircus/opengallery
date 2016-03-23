import { connect } from 'react-redux'
import PhotoUpload from '../components/photo/PhotoUpload'
import { toggleDropWindow, uploadRequest, uploadSuccess, uploadError, UploadPhoto, UploadMetaData } from '../actions/upload.js'
//import other actions from actions folder

const mapStateToProps = (state) => {
  //update props with relevent states
  return {
    currentUser: state.user.id,
    isUploadModalOpen: state.view.isUploadModalOpen,
    currentFileUploading: state.status.currentFileUploading,
    isDropOpen: state.status.isDropOpen,
    isUploaded: state.status.isUploaded, //why?
    error: state.status.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPhotoDrop: (photo, user) => {
      console.log("Inside onPhotoDrop function in photoUpload container with photo: ", photo, user);
      dispatch(uploadRequest(photo));
      //needs to dispatch a current file state?
      UploadPhoto(photo, user);
      // from dropZone example
      // this.setState({
      //   files: files
      // });
    },
    onOpenClick: () => {
      // from dropZone example
      console.log("Inside onOpenClick function in photoUpload container with photo: ", photo);
      dispatch(toggleDropWindow());
      // this.refs.dropzone.open(); // also from dropZone example
    },
    onUploadSuccess: (response) => {
      dispatch(uploadSuccess(response));
    },
    onUploadCancel: (response) => {
      dispatch(uploadCancel(response));
    },
    onUploadFailure: (error) => {
      dispatch(uploadError(error));
    },
    onUploadButtonClick: (metaData, photoId) => {
      dispatch(uploadRequest());
      UploadMetaData(metaData, photoId);
    },
  }
}

const container = connect(
  mapStateToProps, 
  mapDispatchToProps
)(PhotoUpload);

export default container;
