import { connect } from 'react-redux'
import * grid from '../actions/grid'
import * gallery from '../actions/gallery'
import Grid from '../components/grid/Grid'

const mapStateToProps = (state) => {
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
    loadGrid: () => { dispatch(grid.loadData(ownProps.filter)) },
    toggleGallery: (tile) => { dispatch(gallery.toggleView(tile)) }
  }
}

const container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Grid)

export default container
