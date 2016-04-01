import React from 'react';
import Tile from '../tile/Tile';
import { Route } from 'react-router';
import RaisedButton from 'material-ui/lib/raised-button';

export default class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMounted: false
    };
  }

  componentDidMount (nextProps) {
    let artist = this.props.loc ? this.props.loc.pathname.split('/')[2] : undefined;
    this.props.loadData(this.props.id, artist, 0);
    this.setState({hasMounted: true});
  }

  render () {
    let {
      tile,
      grid,
      data,
      toggleGallery,
      id,
      username,
      loadData,
      page,
      total_photos
    } = this.props;
    let artist = this.props.loc ? this.props.loc.pathname.split('/')[2] : undefined;

    if (total_photos === undefined) {
      return (
        <div id="grid-component">
          <div id="grid-error">No Photos</div>
        </div>
      )
    } else {
      return (
        <div id="grid-component">
          <div className="grid-section">
            {this.state.hasMounted ? grid.map((mediaId, index) => (
              <div key={index} className="grid-tile-container">
                <Tile tile={index} mediaId={mediaId} url={data[grid[index]].url_lg} data={data[grid[index]]} handleClick={toggleGallery} deleteMode={this.props.deleteMode} addPhotoToBeDeleted={ this.props.addPhotoToBeDeleted }/>
              </div>
            )) : ''}
          </div>
          <div className="grid-load-button">
            { grid.length < total_photos
              ? <RaisedButton label="Load More Images" onMouseUp={() => loadData(id, artist, page)} />
              : ''
            }
          </div>
        </div>
      )
    }
  }
}
