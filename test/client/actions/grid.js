import { expect } from 'chai'
import * as actions from '../../../client/actions/grid'
import { initialState as state } from '../../initialState'

export const GridActions = () => {
  it('should create a GRID_FILTER action to set filter tags', () => {
    expect(actions.filterGridData(state.grid.filter)).to.deep.equal({
      type: actions.GRID_FILTER,
      payload: state.grid.filter
    })
  })

  it('should create a GRID_REQUEST action to fetch grid data', () => {
    expect(actions.requestGridData()).to.deep.equal({
      type: actions.GRID_REQUEST,
      payload: true
    })
  })

  it('should create a GRID_SUCCESS action to receive grid data', () => {
    expect(actions.receiveGridData(state.grid.tiles)).to.deep.equal({
      type: actions.GRID_SUCCESS,
      payload: state.grid.tiles,
      error: '',
      meta: {
        fetching: false
      }
    })
  })

  it('should create a GRID_FAILURE action to catch errors', () => {
    const error = new Error('Grid Failure')
    expect(actions.catchGridData(error)).to.deep.equal({
      type: actions.GRID_FAILURE,
      error,
      meta: {
        fetching: false
      }
    })
  })
}
