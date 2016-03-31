import React from 'react'
import IconButton from 'material-ui/lib/icon-button'
import DeleteIcon from 'material-ui/lib/svg-icons/action/delete'

const GridTile = ({ tile, img, toggleGallery, deleteMode }) => {
  let button;
  if ( deleteMode ) {
    button =  <IconButton onTouchTap={ () => }>
                <DeleteIcon>
              </IconButton>
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
