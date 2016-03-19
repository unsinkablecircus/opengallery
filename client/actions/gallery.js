export const SHOW_NEXT = 'SHOW_NEXT'
export const SHOW_PREV = 'SHOW_PREV'
export const TOGGLE_GALLERY = 'TOGGLE_GALLERY'

export function nextTile() {
  return {
    type: SHOW_NEXT
  }
}

export function prevTile() {
  return {
    type: SHOW_PREV
  }
}

export function toggleView(tile) {
  return {
    type: TOGGLE_GALLERY,
    payload: tile
  }
}
