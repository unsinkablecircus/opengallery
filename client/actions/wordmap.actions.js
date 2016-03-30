export const SHOW_WORDMAP = 'SHOW_WORDMAP'
export const HIDE_WORDMAP = 'HIDE_WORDMAP'
export const UPDATE_WORDMAP = 'UPDATE_WORDMAP'

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

export function update (media, { feedback, user_feedback_id }) {
  return {
    type: UPDATE_WORDMAP,
    payload: feedback,
    meta: { media, user_feedback_id }
  }
}

export function submit (user, media, feedback) {
  const config = {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: `userId=${user}&feedback=${feedback}&mediaId=${media}`
  }

  return dispatch => {
    fetch(`http://${window.location.hostname}:${window.location.hostname === '54.153.9.57' ? '80' : '8000'}/api/feedback/submitFeedback`, config)
    .then( response => response.json() )
    .then( data => {
      dispatch(update(media, data))
    })
    .catch( err => {
      console.error(`[Error] Failed to POST feedback to server: ${err}`)
      throw new Error(`[Error] Failed to POST feedback to server: ${err}`)
    })
  }
}
