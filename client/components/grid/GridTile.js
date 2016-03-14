import React from 'react'

import Tile from 'material-ui/lib/grid-list/grid-tile'

export default class GridTile extends React.Component {
  render () {
    return (
      <Tile>
        <img src={this.props.img}/>
      </Tile>
    )
  }
}
