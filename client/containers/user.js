import { connect } from 'react-redux';
import User from '../components/user/User';
import { SaveChanges, switchEditMode } from '../actions/user';

const mapStateToProps = (state) => {
  return {
    id: state.user.id,
    username: state.user.username,
    name: state.user.name,
    email: state.user.email,
    website: state.user.website,
    facebook_url: state.user.facebook_url,
    twitter_url: state.user.twitter_url,
    editMode: state.user.editMode
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    switchEditMode: () => {
      dispatch(switchEditMode());
    },
    saveChanges: (values) => {

      console.log('values', values);
      dispatch(SaveChanges(values));
    }
  }
}

const container = connect(
  mapStateToProps,
  mapDispatchToProps
)(User);

export default container;