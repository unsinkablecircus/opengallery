import { connect } from 'react-redux'
import { showNextTile, showPrevTile, toggleGallery } from '../actions/gallery'
import Gallery from '../components/gallery/Gallery'

const mapStateToProps = (state, ownProps) => {
  return {
    tile: state.media.tile,
    grid: state.media.grid,
    filter: state.media.filter,
    data: state.media.data,
    displayGallery: state.view.displayGallery
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    nextTile: () => { dispatch(showNextTile()) },
    prevTile: () => { dispatch(showPrevTile()) },
    hideGallery: (tile) => { dispatch(toggleGallery(tile)) }
  }
}

const container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Gallery)

export default container
