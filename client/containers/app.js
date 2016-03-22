import { connect } from 'react-redux'
import App from '../components/App'

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
