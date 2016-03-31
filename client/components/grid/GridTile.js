import React from 'react'
import IconButton from 'material-ui/lib/icon-button'
import DeleteIcon from 'material-ui/lib/svg-icons/action/delete'

const GridTile = ({ key, tile, img, toggleGallery, deleteMode, addPhotoToBeDeleted }) => {
  let button;
    if ( deleteMode ) {
      console.log("EXTREME DELETE MODE!!!!!!!!!!!!!!")
      button =  <IconButton icon={<DeleteIcon/>} 
                            onTouchTap={ () => {console.log("Inside GridTile"); addPhotoToBeDeleted(key) }} />
  }
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
