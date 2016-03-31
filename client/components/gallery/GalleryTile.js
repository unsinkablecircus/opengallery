import React from 'react'
import { browserHistory } from 'react-router'

const GalleryTile = ({ data }) => {
  return (
    <div className="galleryTile-component">
      <div className="overlay"></div>
      <div className="corner-overlay-content">Info</div>
      <div className="overlay-content">
        <h2>{data.title}</h2>
        <p>{data.description}</p>
        <a onClick={ (e) => {
          e.preventDefault()
          browserHistory.push(`/profile/${ data.artist.username }`)
        }}>
          { data.artist.username }
        </a>
      </div>
    </div>
  )
}

export default GalleryTile
