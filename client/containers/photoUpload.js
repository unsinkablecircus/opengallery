import { connect } from 'react-redux'
import PhotoUpload from '../components/photo/PhotoUpload'
import { UploadPhoto } from '../actions/upload.js'
//import other actions from actions folder

const mapStateToProps = (state) => {
  //update props with relevent states
  return {
    isUploadModalOpen: state.view.isUploadModalOpen,
    isDropOpen: state.status.isDropOpen,
    currentFileUploading: state.status.currentFileUploading,
    isUploaded: state.status.isUploaded,
    error: state.status.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    uploadPhoto: (photo, id) => {
      dispatch(uploadRequest());
      //needs to dispatch a current file state?
      UploadPhoto(photo, id);
      // from dropZone example
      // this.setState({
      //   files: files
      // });
    },
    onOpenClick: () => {
      // from dropZone example
      dispatch({
        type: 'TOGGLE_FILES'
      });
      // this.refs.dropzone.open(); // also from dropZone example
    },
    onUploadSuccess: (response) => {
      dispatch({
        type: 'UPLOAD_SUCCESS'
      });
    },
    onUploadFailure: (error) => {
      dispatch({
        type: 'UPLOAD_FAILURE'
      });
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
