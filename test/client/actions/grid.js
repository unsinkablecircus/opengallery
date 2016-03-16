import { assert, expect } from 'chai'
import * as actions from '../../../client/actions/grid'

export const GridActions = () => {
  it('should create an action to request grid data', (done) => {
    const tags = ['pink', 'cats']
    expect(actions.requestGridData(tags)).to.deep.equal({
      type: actions.GRID_REQUEST,
      payload: tags,
      meta: {
        fetching: true,
        success: false
      }
    })
    done()
  })

  it('should create an action to receive grid data', (done) => {
    const data = {
      grid: ['1'],
      media: {
        '1': {
          userId: '1',
          userFeedbackId: '1',
          media: 'Photograph',
          title: 'Sample Image',
          description: 'This is a test image.',
          tags: ['pink', 'cats'],
          url_sm: '/assets/image-sm',
          url_md: '/assets/image-md',
          url_lg: '/assets/image-lg',
          feedback: ['1']
        }
      },
      feedback: {
        '1': {
          hashtag: 'cool',
          count: '3'
        }
      }
    }
    expect(actions.receiveGridData(data)).to.deep.equal({
      type: actions.GRID_SUCCESS,
      payload: {...data},
      meta: {
        fetching: false,
        success: true
      }
    })
    done()
  })

  it('should create an action to catch errors when data retrieval fails', (done) => {
    const error = new Error('Grid Failure')
    expect(actions.catchGridData(error)).to.deep.equal({
      type: actions.GRID_FAILURE,
      payload: error,
      meta: {
        fetching: false,
        success: false
      }
    })
    done()
  })
}
