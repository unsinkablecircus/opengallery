export const GRID_REQUEST = 'GRID_REQUEST';
export const GRID_SUCCESS = 'GRID_SUCCESS';
export const GRID_FAILURE = 'GRID_FAILURE';

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

export function loadData(id, artist) {
  let params = {
    method: 'GET',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  }

  if (artist) {
    var endpoint = `/api/artist?user=${id}&artist=${artist}`;
  } else {
    var endpoint = `/api/media?user=${id}`;
  }

  return dispatch => {
    dispatch(requestData())

    return fetch(`http://${window.location.hostname}:${window.location.hostname === '54.153.9.57' ? '80' : '8000'}${endpoint}`, params)
    .then(response => {
      if (response.status >= 400) {
        dispatch(catchData(data.message))
        return Promise.reject(data)
      }
      return response.json()
    })
    .then(function(gridData) {
      var grid = [];
      var data = {};
      gridData.rows.forEach((image) => {
        grid.push(image.id);
        // using placeholder data for now -- will need to update with correct data after DB cleanse
        data[image.id] = {
          mediaId: image.id,
          userFeedbackId: 2,
          media: `Media ${image.id}`,
          title: image.title,
          description: image.description,
          tags: [],
          url_sm: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBARXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAHqADAAQAAAABAAAAFAAAAAD/7QA4UGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAAA4QklNBCUAAAAAABDUHYzZjwCyBOmACZjs+EJ+/8AAEQgAFAAeAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMAHBwcHBwcMBwcMEQwMDBEXERERERcdFxcXFxcdIx0dHR0dHSMjIyMjIyMjKioqKioqMTExMTE3Nzc3Nzc3Nzc3P/bAEMBIiQkODQ4YDQ0YOacgJzm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5v/dAAQAAv/aAAwDAQACEQMRAD8AnAOeSadk9jTTuVSxHAojDyANtx1xUG90QzTSR42E5PX6UhJPOTTblJQwboM9qjjbjbg8UxX1P//QulQylW6GpEjRRgDpTBUy9KkYxuOlQnrUzVDQM//Z',
          url_md: 'https://placehold.it/400x300',
          url_lg: 'http://gratisography.com/pictures/287_1.jpg',
          width: 800,
          height: 600,
          showHiRes: false,
          feedback: [[6, 10], [7, 20], [8, 30], [9, 40], [10, 50]]
        };
      });
      dispatch(receiveData(grid, data));
    })
    .catch(err => {
      console.error(`Network failure prevented data retrieval: ${err}`)
      throw new Error(`Network failure prevented data retrieval: ${err}`)
    })
  }
}