import { connect } from 'react-redux';
import User from '../components/user/User';
import { SaveChanges } from '../actions/user';

const mapStateToProps = (state) => {
  return {
    id: state.user.id,
    username: state.user.username,
    email: state.user.email,
    website: state.user.website,
    editMode: state.user.editMode
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    switchEditMode: () => {
      dispatch({
        type: 'SWITCH_EDIT_MODE'
      })
    },
    saveChanges: (data) => {
      dispatch(SaveChanges(data));
    }
  }
}

const container = connect(
  mapStateToProps,
  mapDispatchToProps
)(User);

export default container;