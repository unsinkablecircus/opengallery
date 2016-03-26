import React from 'react'

const GridTile = ({ tile, img, toggleGallery }) => {
  return (
    <div
      className='tile-component'
      onClick={ () => {toggleGallery(tile) }}
      style={{backgroundImage: 'url(' + img + ')'}}
    >
    </div>
  )
}

export default GridTile
