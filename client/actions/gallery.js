export const SHOW_NEXT = 'SHOW_NEXT'
export const SHOW_PREV = 'SHOW_PREV'
export const TOGGLE_MAP = 'TOGGLE_MAP'

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

export function toggleMap() {
  return {
    type: TOGGLE_MAP
  }
}
