import { connect } from 'react-redux';
import User from '../components/user/User';
import { SaveChanges, switchEditMode, fetchUserInfo } from '../actions/user';
import { fetchConversations } from '../actions/messageFeed.actions'

const mapStateToProps = (state, ownProps) => {
  return {
    selfUsername: state.user.username,
    self_id: state.user.id,
    artist: state.artist,
    editMode: state.user.editMode,
    location: ownProps,
    showGridAndNotMessageFeed: state.view.displayGridAndNotMessageFeed
    displayGridAndNotMessageFeed: state.view.displayGridAndNotMessageFeed
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    switchEditMode: () => {
      dispatch(switchEditMode());
    },
    saveChanges: (values) => {
      dispatch(SaveChanges(values));
    },
    toggleShowGridAndNotMessageFeed: () => {
      console.log('clicked');
      dispatch({type: 'TOGGLE_GRID_MESSAGE_FEED'});
    },
    fetchConversations: (self_id) => {
      dispatch(fetchConversations(self_id));
    }
  }
}

const container = connect(
  mapStateToProps,
  mapDispatchToProps
)(User);

export default container;