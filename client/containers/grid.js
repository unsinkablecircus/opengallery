import { connect } from 'react-redux'
import { loadGrid } from '../actions/grid'
import Grid from '../components/grid/Grid'

const mapStateToProps = (state) => {
  return {
    ...state
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


// consider renaming this grid -DW
export default container
