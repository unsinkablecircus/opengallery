import React from 'react'

export default class GalleryTile extends React.Component {
  constructor(props) {
    super(props)
    this.state = { photo: '' }
  }

  componentWillMount = () => {
    let newStyle = Object.assign({}, this.props.style)
    const { width, height, url_sm, url_lg } = this.props.data

    this.setState({
      photo: `url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%0A%20%20%20%20%20xmlns%3Axlink%3D%22http%3A//www.w3.org/1999/xlink%22%0A%20%20%20%20%20width%3D%22${width}%22%20height%3D%22${height}%22%0A%20%20%20%20%20viewBox%3D%220%200%20${width}%20${height}%22%3E%0A%20%20%3Cfilter%20id%3D%22blur%22%20filterUnits%3D%22userSpaceOnUse%22%20color-interpolation-filters%3D%22sRGB%22%3E%0A%20%20%20%20%3CfeGaussianBlur%20stdDeviation%3D%2220%2020%22%20edgeMode%3D%22duplicate%22%20/%3E%0A%20%20%20%20%3CfeComponentTransfer%3E%0A%20%20%20%20%20%20%3CfeFuncA%20type%3D%22discrete%22%20tableValues%3D%221%201%22%20/%3E%0A%20%20%20%20%3C/feComponentTransfer%3E%0A%20%20%3C/filter%3E%0A%20%20%3Cimage%20filter%3D%22url%28%23blur%29%22%0A%20%20%20%20%20%20%20%20%20xlink%3Ahref%3D%22${url_sm}%22%0A%20%20%20%20%20%20%20%20%20x%3D%220%22%20y%3D%220%22%0A%20%20%20%20%20%20%20%20%20height%3D%22100%25%22%20width%3D%22100%25%22/%3E%0A%3C/svg%3E')`
    })

    var img = new Image()
    img.src = url_lg
    img.onload = () => {
      this.setState({ photo: `url(${url_lg})` })
    }
    this.render()
  }

  render () {
    let style = Object.assign({}, this.props.style)
    style.backgroundImage = this.state.photo

    return (
      <div className="gallery-photo" style={style}>
        <div className="overlay"></div>
        <div className="corner-overlay-content">Info</div>
        <div className="overlay-content">
          <h2>{this.props.data.title}</h2>
          <p>{this.props.data.description}</p>
        </div>
      </div>
    )
  }
}
