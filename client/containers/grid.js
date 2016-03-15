import { connect } from 'react-redux'
import { loadGrid } from '../actions/grid'
import Grid from '../components/Grid/'

const mapStateToProps = (state) => {
  return {
    isFetchingMedia: state.isFetchingMedia,
    errorFetchingMedia: state.errorFetchingMedia,
    grid: state.grid,
    media: state.media,
    feedback: state.feedback
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadGrid: () => {
      dispatch(loadGrid(ownProps.filter))
    }
  }
}

const container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Grid)

export default container
