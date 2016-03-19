import React from 'react'
import GridTile from './GridTile'

import GridList from 'material-ui/lib/grid-list/grid-list'

const styles = {
  grid: {
    position: 'absolute',
    top: 70,
    width: '100%'
  }
}

const Grid = ({ tile, grid, filter, data, loadGrid, toggleGallery }) => (
  <GridList
    id="grid-component"
    cellHeight={300}
    padding={15}
    cols={3}
    style={styles.grid}
  >
    {grid.map((id, key) => (
      <GridTile key={key} tile={key} img={data[grid[key]].url_lg} toggleGallery={toggleGallery}/>
    ))}
  </GridList>
)

export default Grid
