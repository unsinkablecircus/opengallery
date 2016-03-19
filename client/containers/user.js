import { connect } from 'react-redux';
import User from '../components/user/User';

const mapStateToProps = (state) => {
  return {
    userId: state.user.userId,
    username: state.user.username,
    editMode: state.user.editMode
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    switchEditMode: (editMode) => {
      dispatch({
        type: 'SWITCH_EDIT_MODE'
      });
    }
  }
}

const container = connect(
  mapStateToProps,
  mapDispatchToProps
)(User);

export default container;