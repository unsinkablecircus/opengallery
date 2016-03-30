import update from 'react-addons-update'

export function addFeedback (state, { payload, media, user_feedback_id }) {
  const idExists = payload.reduce((acc, feed) =>
    acc || feed.id == user_feedback_id, false)

  if (idExists) {
    return update( state, {
      data: {
        [media]: {
          user_feedback_id: { $set: user_feedback_id },
          feedback: { $set: payload }
        }
      }
    })
  } else {
    return update( state, {
      data: {
        [media]: {
          user_feedback_id: { $set: null },
          feedback: { $set: payload }
        }
      }
    })
  }
}
