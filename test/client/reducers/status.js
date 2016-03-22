import { expect } from 'chai'
import * as grid from '../../../client/actions/grid'
import reducer from '../../../client/reducers/status'
import { initialState } from '../../initialState'

export const StatusReducer = () => {
  let state = initialState.status

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.deep.equal(state)
  })

  describe('├─ Grid', () => {
    beforeEach(() => { state = initialState.status })

    it('should handle a GRID_REQUEST action that sets the fetching state', () => {
      const action = grid.requestData()
      expect(reducer(state, action)).to.have.property('fetching', true)
    })

    it('should handle a GRID_FAILURE action that sets the error state', () => {
      const error = new Error('Grid Failure')
      const action = grid.catchData(error)
      expect(reducer(state, action)).to.deep.equal({
        fetching: false,
        error
      })
    })
  })
}
