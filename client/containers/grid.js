import { connect } from 'react-redux'
import { loadGrid } from '../actions/grid'
import { toggleGallery } from '../actions/gallery'
import Grid from '../components/grid/Grid'

const mapStateToProps = (state, ownProps) => {
  return {
    tile: state.media.tile,
    grid: state.media.grid,
    filter: state.media.filter,
    data: state.media.data
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadGrid: () => { dispatch(loadGrid(ownProps.filter)) },
    toggleGallery: (tile) => { dispatch(toggleGallery(tile)) }
  }
}

const container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Grid)

export default container
