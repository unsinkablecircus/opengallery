



const updateFeed = () => {
  return {
    type: 'SOME_TYPE'
  }
}











export const sendSearch = (searchInput) => {




  const config = {
    method: 'POST',
    headers: {'Content-Type':'application/x-www-form-urlencoded'},
    body: `searchInput=${searchInput}`
  }
  console.log('sendsearch', searchInput);

  return (dispatch) => {
    fetch(`http://localhost:8000/api/search`, config)
    .then( (response) => {
      return response.json()
    })
    .then( (data) => {
      console.log('data', data);
    })

  }
}

// do an ajax request to the server









