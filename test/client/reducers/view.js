import { expect } from 'chai'
import * as gallery from '../../../client/actions/gallery'
import reducer from '../../../client/reducers/view'
import { initialState } from '../../initialState'

export const ViewReducer = () => {
  let state = initialState.view

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.deep.equal(state)
  })

  describe('├─ Gallery', () => {
    it('should handle a TOGGLE_GALLERY action that sets the displayGallery state', () => {
      expect(reducer(state, gallery.toggleView()))
        .to.deep.have.property('displayGallery', true)
    })
  })
}
