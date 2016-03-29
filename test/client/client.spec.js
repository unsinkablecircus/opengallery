import { GridActions } from './actions/grid'
import { GalleryActions } from './actions/gallery'

import { MediaReducer } from './reducers/media'
import { StatusReducer } from './reducers/status'
import { ViewReducer } from './reducers/view'

import { GridComponent } from './components/grid'
// import { GridTileComponent } from './components/gridTile'
// import { GalleryComponent } from './components/gallery'
// import { GalleryTileComponent } from './components/gridTile'
// import { TileComponent } from './components/tile'
// import { WordmapComponent } from './components/wordmap'

xdescribe('CLIENT TESTS', () => {
  describe('├─ Actions', () => {
    describe('├─ Grid', GridActions)
    describe('├─ Gallery', GalleryActions)
  })

  describe('├─ Reducers', () => {
    describe('├─ Media', MediaReducer)
    describe('├─ Status', StatusReducer)
    describe('├─ View', ViewReducer)
  })

  describe('├─  Components', () => {
    xdescribe('├─ Grid', GridComponent)
    xdescribe('├─ GridTile', () => {it('should test GridTile component', () => {})})
    xdescribe('├─ Gallery', () => {it('should test Gallery component', () => {})})
    xdescribe('├─ GalleryTile', () => {it('should test GalleryTile component', () => {})})
    xdescribe('├─ Tile', () => {it('should test Tile component', () => {})})
    xdescribe('├─ Wordmap', () => {it('should test Wordmap component', () => {})})
  })
})
