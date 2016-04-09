import React from 'react'
import { Motion, spring } from 'react-motion'
import Tile from '../tile/Tile'
import GalleryTile from './GalleryTile'
import Wordmap from '../wordmap/Wordmap'
import Feedback from '../wordmap/Feedback'

const config = {stiffness: 170, damping: 26}

export default class Gallery extends React.Component {
  constructor (props) {
    super(props)
    this.state = { dimensions: {} }
  }

  componentWillMount () {
    this.resizeGallery(this.props)
  }

  componentDidMount () {
    document.addEventListener('keydown', this.navigateGallery)
    window.addEventListener('resize', this.handleResizeGallery)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.navigateGallery)
    window.removeEventListener('resize', this.handleResizeGallery)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.displayGallery) {
      this.resizeGallery(nextProps)
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    return nextProps.displayGallery;
  }

  navigateGallery = ({ keyCode }) => {
    if (keyCode === 27 || keyCode > 36 && keyCode < 41) {
      const { nextTile, prevTile, hideGallery, showWordmap, hideWordmap } = this.props
      switch (keyCode) {
        case 37: // left arrow
          prevTile()
          break
        case 38: // up arrow
          showWordmap()
          break
        case 39: // right arrow
          nextTile()
          break
        case 40: // down arrow
          hideWordmap()
          break
        case 27: // esc key
          hideGallery(0)
          break
        default:
        return
      }
    }
  }

  handleResizeGallery = () => {
    this.resizeGallery(this.props)
  }

  resizeGallery = ({ data }) => {
    let dimensions = {}
    const vw = window.innerWidth * 0.9
    const vh = window.innerHeight * 0.9

    for (let [media_id, { width, height }] of Object.entries(data)) {
      dimensions[media_id] = {}
      if (width > vw || height > vh) {
        const ratio = Math.max(width / vw, height / vh)
        dimensions[media_id].width = width / ratio
        dimensions[media_id].height = height / ratio
      } else {
        dimensions[media_id].width = width
        dimensions[media_id].height = height
      }
    }
    this.setState({ dimensions: dimensions })
  }

  render () {
    const { tile, grid, data, displayWordmap, hideGallery, nextTile, prevTile, userId, submitInput } = this.props
    const { dimensions } = this.state

    const dim = dimensions[grid[tile]]
    const tileWidth = dim.width
    const tileHeight = dim.height

    const  media = data[grid[tile]]
    const tilePhoto = media.url_lg || media.url_md

    const widths = grid.map(i => tileHeight / dimensions[i].height * dimensions[i].width)

    const start = widths.slice(0, tile)
    .reduce((sum, width) => sum - width, 0)

    let gallery = []
    grid.reduce((left, undefined, i) => {
      gallery.push({
        left: spring(left, config),
        height: spring(tileHeight, config),
        width: spring(widths[i], config)
      })
      return left + widths[i]
    }, start)

    return (
      <div id="gallery-component">
        <div
          className="gallery-close rounded"
          onClick={() => { hideGallery(tile) }}>
          <div className="gallery-escape">ESC</div>
        </div>
        <Motion style={{height: spring(tileHeight), width: spring(tileWidth)}}>
          { container =>
            <div
              className="gallery-motion"
              style={container}
            >
              { gallery.map((style, i) =>
                <Motion key={i} style={style}>
                  { style =>
                      <Tile
                        style={style}
                        url={data[grid[i]].url_lg}
                        data={data[grid[i]]}
                        handleClick={() => {}}
                      >
                        <GalleryTile data={media} hideGallery={ () => {hideGallery(tile)} }/>
                      </Tile>
                  }
                </Motion>
              )}
              { displayWordmap ?
                <Wordmap
                  tile={tile}
                  media={media}
                  displayWordmap={displayWordmap}
                  userId={userId}
                  submitInput={submitInput}
                >
                  <Feedback
                    user={userId}
                    data={grid[tile]}
                    feedback={media.feedback}
                    idx={media.user_feedback_id}
                    submit={submitInput}
                  />
                </Wordmap>
              : '' }
            </div>
          }
        </Motion>
        <div className="gallery-nav" style={{width: spring(tileWidth).val + 100}}>
          <div
            className="gallery-nav-arrow gallery-nav-prev"
            onClick={() => prevTile()}>
          </div>
          <div
            className="gallery-nav-arrow gallery-nav-next"
            onClick={() => nextTile()}>
          </div>
        </div>
      </div>

    )
  }
}
