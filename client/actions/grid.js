export const GRID_FILTER = 'GRID_FILTER'
export const GRID_REQUEST = 'GRID_REQUEST'
export const GRID_SUCCESS = 'GRID_SUCCESS'
export const GRID_FAILURE = 'GRID_FAILURE'

export function filterData(tags) {
  return {
    type: GRID_FILTER,
    payload: tags
  }
}

export function requestData() {
  return {
    type: GRID_REQUEST,
    payload: true
  }
}

export function receiveData(data) {
  return {
    type: GRID_SUCCESS,
    payload: data,
    error: '',
    meta: {
      fetching: false
    }
  }
}

export function catchData(error) {
  return {
    type: GRID_FAILURE,
    error,
    meta: {
      fetching: false
    }
  }
}

export function loadData(tags) {
  let params = {
    method: 'GET',
    query: { tags: tags.join('+') },
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  }

  return dispatch => {
    dispatch(requestData(tags))

    return fetch('/api/media', params)
    .then(response => {
      if (response.status >= 400) {
        dispatch(catchData(data.message))
        return Promise.reject(data)
      }
      return response.json()
    })
    .then(function(gridData) {
      dispatch(receiveData(gridData))
    })
    .catch(err => {
      console.error(`Network failure prevented data retrieval: ${err}`)
      throw new Error(`Network failure prevented data retrieval: ${err}`)
    })
  }
}
