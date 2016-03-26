import React from 'react';
import Tile from '../tile/Tile';
import GridTile from './GridTile';

import RaisedButton from 'material-ui/lib/raised-button';

const Grid = ({ tile, grid, data, loadGrid, toggleGallery }) => {

  return (
    <div id="grid-component">
      <div className="grid-section">
        {grid.map((mediaId, index) => (
          <Tile key={mediaId} tile={index} url={data[grid[index]].url_lg} data={data[grid[index]]} handleClick={toggleGallery}/>
        ))}
      </div>
      <div className="button-load">
        <RaisedButton label="Load More Images"/>
      </div>
    </div>
  )
}

export default Grid
