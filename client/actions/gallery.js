export const SHOW_NEXT = 'SHOW_NEXT'
export const SHOW_PREV = 'SHOW_PREV'
export const TOGGLE_GALLERY = 'TOGGLE_GALLERY'

export function showNextTile() {
  return {
    type: SHOW_NEXT
  }
}

export function showPrevTile() {
  return {
    type: SHOW_PREV
  }
}

export function toggleGallery(tile) {
  return {
    type: TOGGLE_GALLERY,
    payload: tile
  }
}
