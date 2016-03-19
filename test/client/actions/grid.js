import { expect } from 'chai'
import * as grid from '../../../client/actions/grid'
import { initialState as state } from '../../initialState'

export const GridActions = () => {
  it('should create a GRID_FILTER action', () => {
    expect(grid.filterGridData(state.media.filter)).to.deep.equal({
      type: grid.GRID_FILTER,
      payload: state.media.filter
    })
  })

  it('should create a GRID_REQUEST action', () => {
    expect(grid.requestGridData()).to.deep.equal({
      type: grid.GRID_REQUEST,
      payload: true
    })
  })

  it('should create a GRID_SUCCESS action', () => {
    expect(grid.receiveGridData(state.media.grid)).to.deep.equal({
      type: grid.GRID_SUCCESS,
      payload: state.media.grid,
      error: '',
      meta: {
        fetching: false
      }
    })
  })

  it('should create a GRID_FAILURE action', () => {
    const error = new Error('Grid Failure')
    expect(grid.catchGridData(error)).to.deep.equal({
      type: grid.GRID_FAILURE,
      error,
      meta: {
        fetching: false
      }
    })
  })
}
