import { expect } from 'chai'
import * as actions from '../../../client/actions/gallery'

export const GalleryActions = () => {
  it('should create a SHOW_NEXT action to show next tile in gallery', (done) => {
    expect(actions.showNextTile()).to.deep.equal({
      type: actions.SHOW_NEXT
    })
    done()
  })

  it('should create a SHOW_PREV action to show previous tile in gallery', (done) => {
    expect(actions.showPrevTile()).to.deep.equal({
      type: actions.SHOW_PREV
    })
    done()
  })

  it('should create a TOGGLE_MAP action to toggle a D3 wordmap', (done) => {
    expect(actions.toggleMap()).to.deep.equal({
      type: actions.TOGGLE_MAP
    })
    done()
  })
}
