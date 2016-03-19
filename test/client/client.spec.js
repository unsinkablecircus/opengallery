import { GridActions } from './actions/grid'
import { GalleryActions } from './actions/gallery'

import { MediaReducers } from './reducers/media'
import { StatusReducers } from './reducers/status'
import { ViewReducers } from './reducers/view'

import { GridComponent } from './components/grid'
// import { GridTileComponent } from './components/gridTile'
import { GalleryComponent } from './components/grid'
// import { GalleryTileComponent } from './components/gridTile'
// import { TileComponent } from './components/tile'
// import { WordmapComponent } from './components/wordmap'

describe('CLIENT TESTS', () => {
  describe('├─ Actions', () => {
    describe('├─ Grid', GridActions)
    describe('├─ Gallery', GalleryActions)
  })

  describe('├─ Reducers', () => {
    describe('├─ Media', MediaReducers)
    describe('├─ Status', StatusReducers)
    describe('├─ View', ViewReducers)
  })

  describe('├─  Components', () => {
    // describe('├─ Grid', GridComponent)
    // describe('├─ GridTile', GridComponent)
    // describe('├─ Gallery', GalleryComponent)
    // describe('├─ GalleryTile', GalleryComponent)
    // describe('├─ Tile', TileComponent)
    // describe('├─ Wordmapt', WordmapComponent)
  })
})
