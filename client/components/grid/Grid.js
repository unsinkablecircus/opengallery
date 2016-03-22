import React from 'react'
import GridTile from './GridTile'

import GridList from 'material-ui/lib/grid-list/grid-list'

const Grid = ({ tile, grid, filter, data, loadGrid, toggleGallery }) => {

  return (
    <div id="grid-component">
      {grid.map((id, key) => (
        <GridTile  key={key} tile={key} img={data[grid[key]].url_lg} toggleGallery={toggleGallery}/>
      ))}
    </div>
  )
}

export default Grid
