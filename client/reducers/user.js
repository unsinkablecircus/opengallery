var initialState = {
  userId: null,
  username: null,
  editMode: false
};

const user = (state=initialState, action) => {
  switch (action.type) {
    case 'STORE_USER_DATA':
      return Object.assign({}, state, {
        userId: action.payload.userId,
        username: action.payload.username
      })
    default:
      return state;
  }
};

export default user;