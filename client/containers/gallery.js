import { connect } from 'react-redux'
import * as gallery from '../actions/gallery'
import * as wordmap from '../actions/wordmap.actions'
import Gallery from '../components/gallery/Gallery'

const mapStateToProps = (state, ownProps) => {
  return {
    tile: state.media.tile,
    grid: state.media.grid,
    filter: state.media.filter,
    data: state.media.data,
    dictionary: state.media.dictionary,
    displayGallery: state.view.displayGallery,
    displayWordmap: state.view.displayWordmap
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    nextTile: () => { dispatch(gallery.nextTile()) },
    prevTile: () => { dispatch(gallery.prevTile()) },
    hideGallery: (tile) => { dispatch(gallery.toggleView(tile)) },
<<<<<<< a78c0244cb927daa77df463d986c69cbddc19bd4
    showWordmap: () => { dispatch(wordmap.show()) },
    hideWordmap: () => { dispatch(wordmap.hide()) }
=======
    submitInput: (input) => { dispatch(gallery.submitInput(input)) }
>>>>>>> Took off LOGOUT and LOCATION_CHANGE off the storageMiddleware blacklist. By removing LOCATION_CHANGE, routing works predictably.
  }
}

const container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Gallery)

export default container
