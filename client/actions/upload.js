export function UploadPhoto(photoData) {

  const config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `username=${photoData.userId}&title=${photoData.title}&description=${photoData.description}`,
    attach: '' //buffer string
  }
  return dispatch => {
    dispatch(uploadRequest())
    return fetch('http://localhost:8000/api/media/upload', config)
      .then(response =>
        response.json()
      )
      .then((url) =>  
        dispatch(uploadSuccess(url));
      })
      .catch(err => 
        if ( !url ) {
          dispatch(authError('Error uploading photo; perhaps your photo was too large'));
        }
        console.log("Error uploading photo: ", err)
      )
  }
}