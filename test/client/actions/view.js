import { expect } from 'chai'
import * as upload from '../../../client/actions/upload'

export const GalleryActions = () => {
  xit('should create a TOGGLE_PHOTOUPLOAD_MODAL action', (done) => {
    expect(upload.toggleView()).to.deep.equal({
      type: upload.TOGGLE_GALLERY,
      payload
    })
    done()
  })
}
