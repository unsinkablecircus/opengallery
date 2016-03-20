import React from 'react'

const GalleryTile = ({ data, style }) => {
  style.backgroundImage = `url(${data.url_lg})`
  return (
    <div className="gallery-photo" style={style}>
      <div className="overlay"></div>
      <div className="corner-overlay-content">Info</div>
      <div className="overlay-content">
        <h2>{data.title}</h2>
        <p>{data.description}</p>
      </div>
    </div>
  )
}

export default GalleryTile
