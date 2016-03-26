import React from 'react';
import Tile from '../tile/Tile';
import GridTile from './GridTile';

import RaisedButton from 'material-ui/lib/raised-button';

const Grid = ({ 
  tile, 
  grid, 
  data, 
  loadGrid, 
  toggleGallery, 
  id,
  username,
  loadData
}) => {
  let artist = window.location.pathname.split('/')[2];

  return (
    <div id="grid-component">
      <div className="grid-section">
        {grid.map((mediaId, index) => (
          <Tile key={mediaId} tile={index} url={data[grid[index]].url_lg} data={data[grid[index]]} handleClick={toggleGallery}/>
        ))}
      </div>
      <div className="button-load">
        <RaisedButton 
          label="Load More Images"
          onMouseUp={loadData.bind(null, id, artist)}
        />
      </div>
    </div>
  )
}

export default Grid
