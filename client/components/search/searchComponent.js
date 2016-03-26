import React from 'react'



const searchComponent = ({
  searchInput
}) => {




  return (
    <div>
      <h1> What would you like to explore? </h1>
      <input 
        onClick = {searchInput}
      />
    </div>
  )

}

export default searchComponent