import { expect } from 'chai'
import * as gallery from '../../../client/actions/gallery'
import * as upload from '../../../client/actions/upload'
import reducer from '../../../client/reducers/view'
import { initialState } from '../../initialState'

export const ViewReducer = () => {
  let state = initialState.view

  xit('should return the initial state', () => {
    expect(reducer(undefined, {})).to.deep.equal(state)
  })

  describe('├─ Gallery', () => {
    xit('should handle a TOGGLE_GALLERY action that sets the displayGallery state', () => {
      expect(reducer(state, gallery.toggleView()))
        .to.deep.have.property('displayGallery', true)
    })
  })
  describe('├─ Upload', () => {
    xit('should handle a TOGGLE_PHOTOUPLOAD_MODAL action that sets the isUploadModalOpen state', () => {
      expect(reducer(state, upload.toggleView()))
        .to.deep.have.property('displayGallery', true)
    })
  })
}
