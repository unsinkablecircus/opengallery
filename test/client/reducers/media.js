import { expect } from 'chai'
import * as grid from '../../../client/actions/grid'
import * as gallery from '../../../client/actions/gallery'
import reducer from '../../../client/reducers/media'
import { initialState } from '../../initialState'

export const MediaReducer = () => {
  let state = initialState.media

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.deep.equal(state)
  })

  describe('├─ Grid', () => {
    it('should handle a GRID_FILTER action that changes the filter state', () => {
      let tags = ['pink', 'cats']
      let action = grid.filterData(tags)
      expect(reducer(state, action)).to.deep.equal(Object.assign({}, state, {
        filter: tags
      }))
    })

    it('should handle a GRID_SUCCESS action that changes the grid, data, and dictionary states', () => {
      let action = grid.receiveData({
        grid: state.grid,
        data: state.data,
        dictionary: state.dictionary
      })
      expect(reducer(state, action)).to.deep.equal(state)
    })
  })

  describe('├─ Gallery', () => {
    beforeEach(() => { state = initialState.media })

    it('should handle a SHOW_NEXT action that increments the tile state', (done) => {
      let action = gallery.nextTile()
      let tile = state.tile
      expect(reducer(state, action)).to.have.property('tile', tile + 1)

      tile = state.tile = state.grid.length - 1
      expect(reducer(state, action)).to.have.property('tile', tile)
      expect(reducer(state, action)).to.not.have.property('tile', tile + 1)
      done()
    })

    it('should handle a SHOW_PREV action that decrements the tile state', (done) => {
      let action = gallery.prevTile()
      let tile = state.grid.length - 1
      expect(reducer(state, action)).to.have.property('tile', tile - 1)

      tile = state.tile = 0
      expect(reducer(state, action)).to.have.property('tile', tile)
      expect(reducer(state, action)).to.not.have.property('tile', tile - 1)
      done()
    })

    it('should handle a TOGGLE_GALLERY action that sets the tile state', (done) => {
      let action = gallery.toggleView(2)
      expect(reducer(state, action)).to.have.property('tile', 2)
      done()
    })
  })
}
