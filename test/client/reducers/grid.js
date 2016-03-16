import { expect } from 'chai'
import * as actions from '../../../client/actions/grid'
import reducer from '../../../client/reducers/grid'

export const GridReducers = () => {
  it('should return the initial state', (done) => {
    expect(reducer(undefined, {})).to.deep.equal({
      isFetchingMedia: false,
      errorFetchingMedia: '',
      grid: [],
      media: {},
      feedback: {}
    })
    done()
  })

  it('should handle a GRID_REQUEST created from requestGridData', (done) => {
    const tags = ['pink', 'cats']
    const action = actions.requestGridData(tags)
    expect(reducer({}, action)).to.deep.equal({
      isFetchingMedia: true
    })
    done()
  })

  it('should handle a GRID_SUCCESS created from receiveGridData', (done) => {
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
    const action = actions.receiveGridData(data)
    expect(reducer({}, action)).to.deep.equal({
      isFetchingMedia: false,
      errorFetchingMedia: '',
      ...data
    })
    done()
  })

  it('should handle a GRID_FAILURE created from catchGridData', (done) => {
    const error = new Error('Grid Failure')
    const action = actions.catchGridData(error)
    expect(reducer({}, action)).to.deep.equal({
      isFetchingMedia: false,
      errorFetchingMedia: error
    })
    done()
  })
}
