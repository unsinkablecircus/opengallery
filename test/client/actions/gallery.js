import { expect } from 'chai'
import * as gallery from '../../../client/actions/gallery'

export const GalleryActions = () => {
  xit('should create a SHOW_NEXT action', (done) => {
    expect(gallery.nextTile()).to.deep.equal({
      type: gallery.SHOW_NEXT
    })
    done()
  })

  xit('should create a SHOW_PREV action', (done) => {
    expect(gallery.prevTile()).to.deep.equal({
      type: gallery.SHOW_PREV
    })
    done()
  })

  xit('should create a TOGGLE_GALLERY action', (done) => {
    expect(gallery.toggleView(1)).to.deep.equal({
      type: gallery.TOGGLE_GALLERY,
      payload: 1,
    })
    done()
  })
}
