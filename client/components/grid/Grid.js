import React from 'react'
import GridTile from './GridTile'

import GridList from 'material-ui/lib/grid-list/grid-list'

export default class Grid extends React.Component {
  render () {
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

    return (
      <GridList
        cellHeight={300}
        padding={15}
        cols={3}
        style={styles.grid}
      >
        {images.map(image => (
          <GridTile img={image}/>
        ))}
      </GridList>
    )
  }
}
