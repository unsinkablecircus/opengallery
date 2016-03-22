import { connect } from 'react-redux'
import App from '../components/App'


const mapDispatchToProps = (dispatch) => {
  onToggleUpload: () => {
    dispatch({
      type: 'TOGGLE_PHOTOUPLOAD_MODAL'
    });
  }
}

const mapStateToProps = (state, ownProps) => {


  return {
    displayGallery: state.view.displayGallery,
    isUploadModalOpen: state.view.isUploadModalOpen
  }
}

const container = connect(
  mapStateToProps
)(App)

export default container
