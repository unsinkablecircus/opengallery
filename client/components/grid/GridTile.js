import React from 'react'

import Tile from 'material-ui/lib/grid-list/grid-tile'

const GridTile = ({ tile, img, toggleGallery }) => {
  return (
    <div 
      onClick={ () => {toggleGallery(tile) }}
      className='gridTile'
      style={{backgroundImage: 'url(' + img + ')'}}
    >
    </div>
  )
}

export default GridTile
