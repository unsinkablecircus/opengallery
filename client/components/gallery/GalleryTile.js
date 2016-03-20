import React from 'react'

const GalleryTile = ({ img, style }) => (
  <div>
    <img className="gallery-photo" src={img} style={style}/>
  </div>
)

export default GalleryTile
