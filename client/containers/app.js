import { connect } from 'react-redux'
import App from '../components/App'

const mapStateToProps = (state, ownProps) => {
  return {
    displayGallery: state.view.displayGallery
  }
}

const container = connect(
  mapStateToProps
)(App)

export default container
