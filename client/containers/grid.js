import { connect } from 'react-redux'
import * as grid from '../actions/grid'
import * as gallery from '../actions/gallery'
import Grid from '../components/grid/Grid'

const mapStateToProps = (state) => {
  return {
    tile: state.media.tile,
    grid: state.media.grid,
    filter: state.media.filter,
    data: state.media.data,
    displayGallery: state.view.displayGallery,
    id: state.user.id,
    username: state.user.username
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadGrid: () => { dispatch(grid.loadData(ownProps.filter)) },
    toggleGallery: (tile) => { dispatch(gallery.toggleView(tile)) },
    loadData: (id, artist) => { 
      dispatch(grid.loadData(id, artist));
    }
  }
}

const container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Grid)

export default container
