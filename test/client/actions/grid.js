import { expect } from 'chai'
import * as grid from '../../../client/actions/grid'
import { initialState as state } from '../../initialState'

export const GridActions = () => {
  xit('should create a GRID_FILTER action', () => {
    expect(grid.filterData(state.media.filter)).to.deep.equal({
      type: grid.GRID_FILTER,
      payload: state.media.filter
    })
  })

  xit('should create a GRID_REQUEST action', () => {
    expect(grid.requestData()).to.deep.equal({
      type: grid.GRID_REQUEST,
      payload: true
    })
  })

  xit('should create a GRID_SUCCESS action', () => {
    expect(grid.receiveData(state.media.grid)).to.deep.equal({
      type: grid.GRID_SUCCESS,
      payload: state.media.grid,
      error: '',
      meta: {
        fetching: false
      }
    })
  })

  xit('should create a GRID_FAILURE action', () => {
    const error = new Error('Grid Failure')
    expect(grid.catchData(error)).to.deep.equal({
      type: grid.GRID_FAILURE,
      error,
      meta: {
        fetching: false
      }
    })
  })
}
