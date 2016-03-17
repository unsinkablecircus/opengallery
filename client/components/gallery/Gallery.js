import React from 'react'
import {Motion, spring} from '../../src/react-motion'

const config = {stiffness: 170, damping: 26}

const Gallery = ({tile, tags, grid, media, feedback}) => {
  const tileWidth = media[grid[tile]].width
  const tileHeight = media[grid[tile]].height
  const tilePhoto = media[grid[tile]].photo

  const widths = media.map(({width as w, height as h}) => tileHeight / w * h)

  const start = widths.slice(0, currPhoto)
  .reduce((sum, width) => sum - width, 0);

  let dimensions = []
  media.reduce((left, null, i) => {
    dimensions.push({
      left: spring(left, config),
      height: spring(tileHeight, config),
      width: spring(widths[i], config),
    })
    return left + widths[i]
  }, start)

  return (
    <div id="gallery-component">
      <Motion style={{height: spring(height), width: spring(width)}}>
        {container =>
          <div className="gallery-tile" style={container}>
            {configs.map((style, i) =>
              <Motion key={i} style={style}>
                {style =>
                  <img className="gallery-photo" src={photo} style={style}/>
                }
              </Motion>
            )}
          </div>
        }
      </Motion>
    </div>
  )
}

export default Gallery
