import React from 'react'

import Tile from 'material-ui/lib/grid-list/grid-tile'

const GridTile = ({ tile, img, toggleGallery }) => {
  console.log(img);
  return (
    <div 
      className='gridTile'
      style={{backgroundImage:= 'url(' + img + ')'}}
    >
    </div>
  )
}

export default GridTile
