import { connect } from 'react-redux';
import * as grid from '../actions/grid';
import * as gallery from '../actions/gallery';
import Grid from '../components/grid/Grid';

const mapStateToProps = (state) => {
  return {
    tile: state.media.tile,
    grid: state.media.grid,
    filter: state.media.filter,
    data: state.media.data,
    displayGallery: state.view.displayGallery,
    id: state.user.id,
    username: state.user.username,
    page: state.media.page
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleGallery: (tile) => { dispatch(gallery.toggleView(tile)) },
    loadData: (id, artist, page) => { 
      dispatch(grid.loadData(id, artist, page));
    }
  }
}

const container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Grid)

export default container
