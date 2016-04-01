export const GRID_REQUEST = 'GRID_REQUEST';
export const GRID_SUCCESS = 'GRID_SUCCESS';
export const GRID_FAILURE = 'GRID_FAILURE';
export const CLEAR_MEDIA = 'CLEAR_MEDIA';
export const UPDATE_ARTIST = 'UPDATE_ARTIST';

export function requestData() {
  return {
    type: GRID_REQUEST,
    payload: true
  }
}

export function receiveData(grid, data, total_photos) {
  return {
    type: GRID_SUCCESS,
    payload: {
      grid,
      data,
      total_photos
    },
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

export function clearMedia() {
  return {
    type: CLEAR_MEDIA
  }
}

export function updateArtist(artist) {
  return {
    type: UPDATE_ARTIST,
    payload: {
      id: artist.id,
      username: artist.username,
      name: artist.name,
      email: artist.email,
      website: artist.website,
      facebook_url: artist.facebook,
      twitter_url: artist.twitter,
      avatar: artist.avatar,
      media: artist.media,
      about: artist.about
    }
  }
}

export function loadData(id, artist, page, search) {
  let params = {
    method: 'GET',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  }

  if (artist) {
    var endpoint = `/api/artist?user=${id}&artist=${artist}&page=${page}`;
  } else if (search) {
    var tagsArray = search.replace(/\W+/g, " ").split(" ")
    var tags = '';
    tagsArray.forEach(tag => {
      tags = tags + '&tags[]=' + tag;
    });
    var endpoint = `/api/media?user=${id}&page=${page}${tags}`;
  } else {
    var endpoint = `/api/media?user=${id}&page=${page}`;
  }
  return dispatch => {
    if (page === 0) {
      dispatch(clearMedia());
    }

    dispatch(requestData());

    return fetch(`http://${window.location.hostname}:${window.location.hostname === '54.153.9.57' ? '80' : '8000'}${endpoint}`, params)
    .then(response => {
      if (response.status >= 400) {
        dispatch(catchData(data.message))
        return Promise.reject(data)
      }
      return response.json()
    })
    .then(res => {
      var grid = []
      var data = {}
      if (artist) {
        dispatch({
          type: 'UPDATE_PROFILE_FORM_AFTER_FETCH',
          payload: res.rows[0].artist[0]
        })
        dispatch(updateArtist(res.rows[0].artist[0]));
      } 
      if (res.rows[artist ? 1 : 0].data !== null) {

        res.rows[artist ? 1 : 0].data.forEach((image) => {
          grid.push(image.media_id);
          data[image.media_id] = {
            media_id: image.media_id,
            title: image.title,
            media: image.media,
            description: image.description,
            width: image.width || 800,
            height: image.height || 600,
            url_sm: image.url_sm,
            url_md: image.url_md,
            url_lg: image.url_lg,
            artist: image.artist,
            tags: image.tags || [],
            user_feedback_id: image.user_feedback_id || null,
            feedback: image.feedback || []
          };
        });
        var total_photos = res.rows[artist ? 2 : 1].total_records;
      }
      dispatch(receiveData(grid, data, total_photos));
    })
    .catch(err => {
      console.error(`Network failure prevented data retrieval: ${err}`)
      throw new Error(`Network failure prevented data retrieval: ${err}`)
    })
  }
}
