export const GRID_REQUEST = 'GRID_REQUEST'
export const GRID_SUCCESS = 'GRID_SUCCESS'
export const GRID_FAILURE = 'GRID_FAILURE'

export function requestGridData(tags) {
  return {
    type: GRID_REQUEST,
    payload: tags,
    meta: {
      fetching: true,
      success: false
    }
  }
}

export function receiveGridData(data) {
  return {
    type: GRID_SUCCESS,
    payload: {...data},
    meta: {
      fetching: false,
      success: true
    }
  }
}

export function catchGridData(error) {
  return {
    type: GRID_FAILURE,
    error,
    meta: {
      fetching: false,
      success: false
    }
  }
}

export function loadGrid(tags) {
  let params = {
    method: 'GET',
    query: { tags: tags.join('+') },
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  }

  return dispatch => {
    // Dispatch requestGridData to kickoff the call to network API
    dispatch(requestGridData(tags))

    return fetch('/api/media', params)
    .then(response => {
      if (response.status >= 400) {
        dispatch(catchGridData(data.message))
        return Promise.reject(data)
      }
      return response.json()
    })
    .then(function(gridData) {
      dispatch(receiveGridData(gridData))
    })
    .catch(err => {
      console.error(`Network failure prevented data retrieval: ${err}`)
      throw new Error(`Network failure prevented data retrieval: ${err}`)
    })
  }
}
