import React from 'react'
import GridTile from './GridTile'

import GridList from 'material-ui/lib/grid-list/grid-list'

const styles = {
  grid: {
    position: 'absolute',
    width: '100vw',
    height: '100vh',
    overflowY: 'auto',
    paddingTop: 68
  }
}

const images = []
for (var i = 285; i >= 1; i--) {
  images.push(`http://gratisography.com/pictures/${i}_1.jpg`)
}

const Grid = ({isFetchingMedia, errorFetchingMedia, grid, media, feedback, loadGrid}) => {
  return (
    <GridList
      cellHeight={300}
      padding={15}
      cols={3}
      style={styles.grid}
    >
      {images.map((image, key) => (
        <GridTile key={key} img={image}/>
      ))}
    </GridList>
  )
}

export default Grid
