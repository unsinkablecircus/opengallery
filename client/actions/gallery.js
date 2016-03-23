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

export function submitInput(info) {

  const creds = {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-encoded'},
    body: `username=${info.username}&input=${info.input}`
  }

  return (dispatch) => {

    fetch('http://localhost:8000/api/users/submitInput', config)
    .then( response => {
       response.json();
    })
    .then( data => {
      // do something with the data
      console.log('input submitted');
    })
    .catch( err => {
      console.log('err', err);
    })


  }

}