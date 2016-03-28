export const GRID_REQUEST = 'GRID_REQUEST';
export const GRID_SUCCESS = 'GRID_SUCCESS';
export const GRID_FAILURE = 'GRID_FAILURE';
export const CLEAR_MEDIA = 'CLEAR_MEDIA';

export function requestData() {
  return {
    type: GRID_REQUEST,
    payload: true
  }
}

export function receiveData(grid, data) {
  return {
    type: GRID_SUCCESS,
    payload: {
      grid,
      data
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

export function loadData(id, artist, page) {
  let params = {
    method: 'GET',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  }


  if (artist) {
    var endpoint = `/api/artist?user=${id}&artist=${artist}&page=${page}`;
  } else {
    var endpoint = `/api/media?user=${id}&page=${page}`;
  }

  return dispatch => {
    if (page === 0) {
      dispatch(clearMedia());
    }
    
    dispatch(requestData())

    return fetch(`http://${window.location.hostname}:${window.location.hostname === '54.153.9.57' ? '80' : '8000'}${endpoint}`, params)
    .then(response => {
      if (response.status >= 400) {
        dispatch(catchData(data.message))
        return Promise.reject(data)
      }
      return response.json()
    })
    .then(function(data) {
      var grid = [];
      var data = {};
      dispatch(updateArtist(data.rows[0].artist[0]));

      data.rows[1].data[0].forEach((image) => {
        grid.push(image.media_id);
        data[image.media_id] = {
          media_id: image.media_id,
          title: image.title,
          media: image.media,
          description: image.description,
          width: image.width,
          height: image.height,
          // using placeholder images for now -- will need to update with correct data after DB cleanse
          url_sm: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBARXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAHqADAAQAAAABAAAAFAAAAAD/7QA4UGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAAA4QklNBCUAAAAAABDUHYzZjwCyBOmACZjs+EJ+/8AAEQgAFAAeAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMAHBwcHBwcMBwcMEQwMDBEXERERERcdFxcXFxcdIx0dHR0dHSMjIyMjIyMjKioqKioqMTExMTE3Nzc3Nzc3Nzc3P/bAEMBIiQkODQ4YDQ0YOacgJzm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5v/dAAQAAv/aAAwDAQACEQMRAD8AnAOeSadk9jTTuVSxHAojDyANtx1xUG90QzTSR42E5PX6UhJPOTTblJQwboM9qjjbjbg8UxX1P//QulQylW6GpEjRRgDpTBUy9KkYxuOlQnrUzVDQM//Z',
          url_md: "https://placehold.it/400x300",
          url_lg: 'http://gratisography.com/pictures/287_1.jpg',
          artist: image.artist,
          tags: image.tags,
          user_feedback_id: image.user_feedback_id,
          feedback: image.feedback
        };
      });
      dispatch(receiveData(grid, data));
      dispatch(updateArtist());
    })
    .catch(err => {
      console.error(`Network failure prevented data retrieval: ${err}`)
      throw new Error(`Network failure prevented data retrieval: ${err}`)
    })
  }
}