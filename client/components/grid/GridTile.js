import React from 'react'

import Tile from 'material-ui/lib/grid-list/grid-tile'

const GridTile = ({ tile, img, toggleGallery }) => (
  <Tile>
    <img src={img} onClick={() => toggleGallery(tile)}/>
  </Tile>
)

export default GridTile
