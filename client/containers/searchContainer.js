import { connect } from 'react-redux'
import searchComponent from '../components/search/searchComponent'

const mapStateToProps = () => {

  return {
    
  }
}

const mapDispatchToProps = () => {
  return {
    searchInput: () => {
      console.log('searching');
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(searchComponent)