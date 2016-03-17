import { expect } from 'chai'
import * as actions from '../../../client/actions/gallery'
import reducer from '../../../client/reducers/gallery'

export const GalleryReducers = () => {
  let state = {}
  beforeEach(() => {
    state = {
      currentTile: 0,
      displayGallery: false,
      grid: [1, 2, 3]
    }
  })

  it('should return the initial state', (done) => {
    expect(reducer(undefined, {})).to.deep.equal(state)
    done()
  })

  it('should handle a SHOW_NEXT action that loops back to beginning of grid', (done) => {
    let action = actions.showNextTile()
    expect(reducer(state, action)).to.have.property('currentTile', 1)

    state.currentTile = 2
    expect(reducer(state, action)).to.not.have.property('currentTile', 3)
    expect(reducer(state, action)).to.have.property('currentTile', 0)
    done()
  })

  it('should handle a SHOW_PREV action that loops around to end of grid', (done) => {
    let action = actions.showPrevTile()
    state.currentTile = 2
    expect(reducer(state, action)).to.have.property('currentTile', 1)

    state.currentTile = 0
    expect(reducer(state, action)).to.not.have.property('currentTile', -1)
    expect(reducer(state, action)).to.have.property('currentTile', 2)
    done()
  })

  it('should handle a TOGGLE_MAP action that toggles a wordmap display', (done) => {
    let action = actions.showPrevTile()
    state.currentTile = 2
    expect(reducer(state, action)).to.have.property('currentTile', 1)

    state.currentTile = 0
    expect(reducer(state, action)).to.not.have.property('currentTile', -1)
    expect(reducer(state, action)).to.have.property('currentTile', 2)
    done()
  })
}
