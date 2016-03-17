import { expect } from 'chai'
import reducer from '../../../client/reducers/grid'
import * as actions from '../../../client/actions/grid'
import { initialState as state } from '../../initialState'

export const GridReducers = () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.deep.equal(state.grid)
  })

  it('should handle a GRID_FILTER action created from filterGridData', () => {
    const tags = ['pink', 'cats']
    const action = actions.filterGridData(tags)
    expect(reducer({}, action)).to.deep.equal({
      filter: tags
    })
  })

  it('should handle a GRID_REQUEST created from requestGridData', () => {
    const action = actions.requestGridData()
    expect(reducer({}, action)).to.deep.equal({
      fetching: true
    })
  })

  it('should handle a GRID_SUCCESS created from receiveGridData', () => {
    const action = actions.receiveGridData(state.grid.tiles)
    expect(reducer({}, action)).to.deep.equal({
      fetching: false,
      error: '',
      tiles: state.grid.tiles
    })
  })

  it('should handle a GRID_FAILURE created from catchGridData', () => {
    const error = new Error('Grid Failure')
    const action = actions.catchGridData(error)
    expect(reducer({}, action)).to.deep.equal({
      fetching: false,
      error: error
    })
  })
}
