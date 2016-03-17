import { expect } from 'chai'
import React from 'react'
import util from 'react-addons-test-utils'
import Grid from '../../../client/components/grid/Grid'
import GridTile from '../../../client/components/grid/GridTile'
import GridList from 'material-ui/lib/grid-list/grid-list'

function setup() {
  let props = {
    isFetchingMedia: false,
    errorFetchingMedia: '',
    grid: [],
    media: {},
    feedback: {},
    loadGrid: 'sinon spy' //expect.createSpy()
  }
  let renderer = util.createRenderer()
  renderer.render(<Grid {...props}/>)
  let output = renderer.getRenderOutput()

  return { props, output, renderer }
}

const { output } = setup()

export const GridComponent = () => {
  it('should render a Material-UI GridList', (done) => {
    expect(output.type, 'GridList :').to.equal(GridList)
    expect(output.props.className, 'props.className :').to.be.empty
    expect(output.props.cellHeight, 'props.cellHeight :').to.equal(300)
    expect(output.props.padding, 'props.padding :').to.equal(15)
    expect(output.props.cols, 'props.cols :').to.equal(3)
    done()
  })

  it('should have GridTile child components', (done) => {
    let gridTile = output.props.children[0]
    expect(gridTile.type).to.equal(GridTile)
    expect(gridTile.key).to.equal('0')
    done()
  })
}
