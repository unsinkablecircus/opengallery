import { GridComponent } from './components/grid'
import { GridActions } from './actions/grid'
import { GridReducers } from './reducers/grid'

// import { GalleryComponent } from './components/gallery'
import { GalleryActions } from './actions/gallery'
import { GalleryReducers } from './reducers/gallery'

describe('CLIENT TESTS', () => {
  describe('Grid', () => {
    describe('Component', GridComponent)
    describe('Actions', GridActions)
    describe('Reducers', GridReducers)
  })

  describe('Gallery', () => {
    // describe('Component', GalleryComponent)
    describe('Actions', GalleryActions)
    describe('Reducers', GalleryReducers)
  })
})
