import { expect } from 'chai'
import * as gridActions from '../client/actions/grid'

console.log('GRID ACTIONS:', JSON.stringify(gridActions))

describe('Actions', () => {
  describe('Grid Actions', () => {
    it('should create an action to request grid data', () => {
      const tags = ['pink', 'cats']
      const expectedAction = {
        type: gridActions.GRID_REQUEST,
        fetching: true,
        success: false,
        tags
      }
      expect(gridActions.requestGridData(tags)).toEqual(expectedAction)
    })

    it('should create an action to receive grid data', () => {
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
      const expectedAction = {
        type: gridActions.GRID_SUCCESS,
        fetching: false,
        success: true,
        data
      }
      expect(gridActions.receiveGridData(data)).toEqual(expectedAction)
    })

    it('should create an action to catch errors when data retrieval fails', () => {
      const error = new Error('Grid Failure')
      const expectedAction = {
        type: gridActions.GRID_FAILURE,
        fetching: false,
        success: false,
        error
      }
      expect(gridActions.catchGridData(error)).toEqual(expectedAction)
    })
  })
})
