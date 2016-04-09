import React from 'react'
import { browserHistory } from 'react-router'

const GalleryTile = ({ data, hideGallery }) => {
  return (
    <div className="gallery-tile-component">
      <h2 className="gallery-tile-title">
        { data.title }
      </h2>
      <div className="gallery-tile-avatar"></div>
      <a className="gallery-tile-artist"
        onClick={ (e) => {
          e.preventDefault();
          browserHistory.push(`/profile/${ data.artist.username }`);
          hideGallery();
      }}>
        { data.artist.username }
      </a>
      <span className="gallery-tile-desc">
        { data.description }
      </span>
      <div className="gallery-tile-tags">
        { data.tags.map((tag, i) =>
          <span key={i} className="gallery-tile-tag">{ tag }</span>
        )}
      </div>
    </div>
  )
}

export default GalleryTile
