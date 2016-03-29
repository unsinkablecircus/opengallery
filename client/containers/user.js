import { connect } from 'react-redux';
import User from '../components/user/User';
import { SaveChanges, switchEditMode, fetchUserInfo } from '../actions/user';

const mapStateToProps = (state, ownProps) => {
  return {
    selfUsername: state.user.username,
    artist: state.artist,
    editMode: state.user.editMode,
    location: ownProps,
    showGridAndNotMessageFeed: state.view.displayGridAndNotMessageFeed
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    switchEditMode: () => {
      dispatch(switchEditMode());
    },
    saveChanges: (values) => {
      dispatch(SaveChanges(values));
    }
  }
}

const container = connect(
  mapStateToProps,
  mapDispatchToProps
)(User);

export default container;