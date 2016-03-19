import { connect } from 'react-redux';
import User from '../components/user/User';
import { SignupUser } from '../actions/user';

const mapStateToProps = (state) => {
  return {
    userId: state.user.userId,
    username: state.user.username,
    editMode: state.user.editMode
  }
}

const container = connect(
  mapStateToProps
)(User);

export default container;