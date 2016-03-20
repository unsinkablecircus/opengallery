const initialState = {
  userId: null,
  username: null,
  email: null,
  website: null,
  editMode: false
};

const user = (state=initialState, action) => {
  switch (action.type) {
    case 'STORE_USER_DATA':
      return Object.assign({}, state, {
        userId: action.payload.userId,
        username: action.payload.username
      })
    case 'SWITCH_EDIT_MODE':
      return Object.assign({}, state, {
        editMode: !state.editMode
      }) 
    default:
      return state;
  }
};

export default user;

// Warning: setState(...): Cannot update during an existing state transition 
// (such as within `render`). Render methods should be a pure function of props 
// and state