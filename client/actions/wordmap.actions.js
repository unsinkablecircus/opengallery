export const SHOW_WORDMAP = 'SHOW_WORDMAP'
export const HIDE_WORDMAP = 'HIDE_WORDMAP'

export function show () {
  return {
    type: SHOW_WORDMAP
  }
}

export function hide () {
  return {
    type: HIDE_WORDMAP
  }
}

export function add ({ word, media }) {
  return {
    type: ADD_TO_WORDMAP,
    payload: word,
    meta: {
      media
    }
  }
}

export function update ({ word, media }) {
  return {
    type: UPDATE_WORDMAP,
    payload: word,
    meta: {
      media
    }
  }
}
