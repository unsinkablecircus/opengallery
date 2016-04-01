import React from 'react'
import IconButton from 'material-ui/lib/icon-button'
import DeleteIcon from 'material-ui/lib/svg-icons/action/delete'

const GridTile = ({ key, tile, img, toggleGallery, deleteMode, addPhotoToBeDeleted }) => {
  
  return (
    <div
      className='tile-component'
      onClick={ () => {toggleGallery(tile) }}
      style={{backgroundImage: 'url(' + img + ')'}}
    >
    {button}
    </div>
  )
}

export default GridTile
